import { useCallback, useEffect, useRef, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useTranslation } from "react-i18next";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { FiSearch, FiArrowLeftCircle } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
import { PiPlus, PiSpinner } from "react-icons/pi";
import Users from "./components/Users";
import { errorHandler, getToastWarn } from "../../../utils/options";
import { axiosInstances } from "../../../config/config";
import Msg from "./components/Msg";
import { getProfile } from "../../../redux/reducers/profileReducer";
import { useAuth } from "../../../services/useAuth";
import userImg from "../../../assets/images/user.jpg";
import { styles } from "../../../helpers";
import { Circle } from "lucide-react";
import {
  deleteOneNotification,
  getAllNotifications,
} from "../../../redux/reducers/notificationsReducer";

const Messages = (props) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { t } = useTranslation();
  const { user_id } = useAuth();
  const cookie = new Cookies();
  const [selectedUser, setSelectedUser] = useState({});
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const email_ref = useRef();
  const message_ref = useRef();
  const { allNotifications, loading } = useSelector(
    (state) => state.notificationsReducer
  );
  const dispatch = useDispatch();

  const removeNotificationWithSelectedUser = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    const selectUserNotification =
      allNotifications?.filter(
        (el) => el.favorite?.sender?.id === selectedUser.receiver?.id
      ) || [];

    if (selectUserNotification.length > 0) {
      selectUserNotification.forEach((el) => {
        dispatch(deleteOneNotification(el, { signal })); // <-- invoke and access state object
      });
    }
  };

  useEffect(() => {
    if (selectedUser) {
      removeNotificationWithSelectedUser();
    }
  }, [selectedUser, allNotifications]);

  // working socket
  useEffect(() => {
    if (socket) {
      socket.onopen = () => {};

      socket.onmessage = (msg) => {
        const incomingMessage = JSON.parse(msg.data);
        let resultMsg = selectedUser.messages;

        // Add sender information only if the sender is not the current user
        if (incomingMessage.sender.id !== user_id) {
          resultMsg.push(incomingMessage);
          // const audio = new Audio('/audio/notification.mp3');
          // audio.play();
        } else {
          // Optionally, you can add logic to handle messages sent by the current user differently
          resultMsg.push({ ...incomingMessage, isCurrentUser: true });
        }
        setSelectedUser({ ...selectedUser, messages: resultMsg });
      };
    }
  }, [socket]);

  // working with state
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (state) {
      const getData = async () => {
        setIsUserLoading(true);
        if (state.receiver.email) {
          try {
            const res = await axiosInstances.post(
              "/chat/create_room/",
              {
                email: state.receiver.email,
              },
              { signal }
            );
            if (res.status === 200 || res.status === 201) {
              const response = await axiosInstances.get(`/chat/rooms/`, {
                signal,
              });
              setUsers(response.data);
              setIsUserLoading(false);
            }
            getToastWarn(
              res.data ||
                res.data?.message ||
                t("toastMessage.messagesPage.not_found")
            );
          } catch (error) {
            setIsUserLoading(false);
            errorHandler(error);
          }
        }
      };
      getData();
    }

    return () => controller.abort();
  }, [state]);

  useEffect(() => {
    if (state && users && Array.isArray(users) && users?.length > 0) {
      let idx = -1;
      let copyUsers = users.filter(
        (el) => el.initiator?.id !== el.receiver?.id
      );
      for (let i = 0; i < copyUsers?.length; i++) {
        if (
          copyUsers[i].receiver.id === state.receiver.id ||
          copyUsers[i].initiator.id === state.receiver.id
        ) {
          idx = i;
          break;
        }
      }
      if (idx > -1) {
        let user = document.querySelectorAll(".getMessagesUsers")[idx];
        user?.click();
      }
    }
  }, [users]);

  // get all chat users
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getData = async () => {
      setIsUserLoading(true);
      try {
        const res = await axiosInstances.get(`/chat/rooms/`, { signal });
        setUsers(res.data);
        setIsUserLoading(false);
      } catch (error) {
        setIsUserLoading(false);
        errorHandler(error);
      }
      props.onGetProfile({ signal }); // get profile data
    };

    getData();

    return () => controller.abort();
  }, []);

  // get user with email
  const getUser = async () => {
    setIsUserLoading(true);
    if (email_ref.current?.value) {
      try {
        const res = await axiosInstances.post("/chat/create_room/", {
          email: email_ref.current.value,
        });
        if (res.status === 200 || res.status === 201) {
          if (res.data?.message) getToastWarn(res.data?.message);
          else {
            try {
              const res = await axiosInstances.get(`/chat/rooms/`, { signal });
              setUsers(res.data);
              setIsUserLoading(false);
            } catch (error) {
              errorHandler(error);
            }
          }
        }
        getToastWarn(
          res.data ||
            res.data?.message ||
            t("toastMessage.messagesPage.not_found")
        );
      } catch (error) {
        setIsUserLoading(false);
        errorHandler(error);
      }
    }
  };

  // get messages for one user
  const getMessages = useCallback(async (item) => {
    try {
      const res = await axiosInstances.get(`/chat/conversation/${item?.id}/`);
      if (res.status === 200 || res.status === 201) {
        setSocket(
          new W3CWebSocket(
            `${import.meta.env.VITE_SOCKET_SERVER_URL}chat/${
              res.data.id
            }/?token=${cookie.get("user")}`
          )
        ); // connection to room
        setSelectedUser(res.data);
      } else getToastWarn(res.data || res.data?.message);
    } catch (error) {
      // console.log(error);
      errorHandler(error);
    }
  }, []);

  // send message
  const sendMessage = () => {
    if (
      socket &&
      socket.readyState === WebSocket.OPEN &&
      message_ref.current.value
    ) {
      socket.send(
        JSON.stringify({
          message: message_ref.current.value,
          info: "",
        })
      );
      message_ref.current.value = "";
      message_ref.current.focus();
      const audio = new Audio("/audio/sending.mp3");
      audio.play();
    }
  };

  const enterClickHandler = (event) => {
    if (event.keyCode === 13) sendMessage();
  };

  // back to chat
  const backToChat = () => {
    setSelectedUser({});
  };

  // navigate handler
  const navigateHandler = (item) => {
    navigate("/admin/specializations/specialization-detail", {
      state: { ...item, isChange: false },
    });
  };
  return (
    <div className="h-screen w-full lg:max-w-5xl mx-auto my-4 lg:my-10 grid grid-cols-7 gap-4">
      <div
        className={`relative max-h-[calc(100vh-160px)] col-span-7 lg:col-span-3 rounded-lg ${
          selectedUser.hasOwnProperty("id")
            ? "hidden lg:block"
            : "block lg:block"
        }`}
      >
        <form
          onSubmit={getUser}
          className="flex items-center gap-2 mb-2 lg:mb-4 w-full"
        >
          <div className="flex items-center h-[50px] rounded-lg shadow px-3 w-full ">
            <FiSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder={t(
                "dashboard.messages.search_chat_input_placeholder"
              )}
              className="bg-transparent outline-none select-none text-[14px] leading-[16.98px] font-medium text-[#A7A5A5] font-montserrat"
              ref={email_ref}
              required
            />
          </div>
          <button
            type="submit"
            className={`${styles.active} h-[50px] rounded-xl border bg-text-main_green active:bg-black active:transition-all active:duration-500 flex items-center justify-center cursor-pointer`}
          >
            <PiPlus className="w-[50px]" size={20} color="white" />
          </button>
        </form>
        <div className="flex flex-col gap-y-2 h-[90%] overflow-y-auto bg-white shadow-md rounded-[10px] py-2 px-4 border">
          <div className="flex border-b py-3 justify-between items-center mb-2">
            <div className="flex items-center">
              <span className="font-gilroy-bold font-montserrat font-medium text-[15px] leading-[19.41px] text-[#A7A5A5]">
                {t("dashboard.messages.all_messages")}
              </span>
              {/* <IoIosArrowDown className='ml-2 text-gray-400 ' /> */}
            </div>
          </div>
          <div className="user_sidebar overflow-y-scroll h-[calc(100vh-160px)] lg:h-[calc(100vh-160px)]">
            {isUserLoading ? (
              <div className="flex items-center justify-center h-[500px]">
                <Circle className="animate-spin" />
              </div>
            ) : (
              <Users
                users={users}
                getMessages={getMessages}
                profileData={props.profileData}
                selectedUser={selectedUser}
                removeNotificationWithSelectedUser={
                  removeNotificationWithSelectedUser
                }
              />
            )}
          </div>
        </div>
      </div>
      {selectedUser.hasOwnProperty("id") && (
        <div
          className={`max-h-[calc(100vh-160px)] overflow-y-auto col-span-7 lg:col-span-4 bg-white rounded-lg shadow ${
            selectedUser.hasOwnProperty("id") ? "flex" : "hidden"
          } lg:flex flex-col relative h-[calc(100vh-160px)] lg:h-[calc(100vh-160px)]`}
        >
          {/* Header */}
          <div className="flex justify-between p-4 h-[10%] items-center border-b">
            <div className="flex items-center w-full gap-4">
              <FiArrowLeftCircle
                className="cursor-pointer block lg:hidden"
                size={25}
                onClick={backToChat}
              />
              <img
                src={
                  selectedUser?.receiver?.avatar
                    ? selectedUser.initiator.avatar
                    : "https://github.com/shadcn.png"
                }
                className="rounded-full w-12 h-12 border object-cover"
              />
              <div className="text-sm lg:text-base">
                {selectedUser?.receiver?.id !== props.profileData.id ? (
                  <h5
                    onClick={() =>
                      navigateHandler(
                        selectedUser.receiver || selectedUser.initiator
                      )
                    }
                    className="cursor-pointer font-semibold leading-[19.6px] text-[16px] font-montserrat"
                  >
                    {selectedUser.receiver?.first_name ||
                      selectedUser.initiator?.first_name}{" "}
                    {selectedUser.receiver?.last_name ||
                      selectedUser.initiator?.last_name}
                  </h5>
                ) : (
                  <h5
                    onClick={() => navigateHandler(selectedUser.initiator)}
                    className="cursor-pointer font-semibold"
                  >
                    {selectedUser.initiator?.first_name}{" "}
                    {selectedUser.initiator?.last_name}
                  </h5>
                )}
              </div>
            </div>
          </div>

          {/* Messages Section */}
          <div className="flex flex-col bg-white overflow-y-auto h-[80%] p-4 justify-end">
            <div className="flex flex-col h-full justify-end">
              <Msg data={selectedUser} profileData={props.profileData} />
            </div>
          </div>

          {/* Input Section */}
          {true ? (
            <div className="flex items-center bg-white border-t p-4 absolute bottom-0 left-0 right-0">
              <input
                type="text"
                placeholder={t(
                  "dashboard.messages.enter_message_input_placeholder"
                )}
                className="flex-1 p-2 border border-gray-300 rounded-lg outline-none"
                onKeyDown={enterClickHandler}
                ref={message_ref}
                defaultValue={state ? state.text : ""}
                autoFocus
              />
              <button
                type="button"
                onClick={sendMessage}
                className="ml-2 text-gray-500 text-xl"
              >
                <IoSend />
              </button>
            </div>
          ) : (
            <div className="flex items-center bg-gray-100 text-gray-500 text-center text-sm p-4 absolute bottom-0 left-0 right-0">
              {t("dashboard.messages.alert_text")}
            </div>
          )}
        </div>
      )}
      {/* messages */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    allUsers: state.chatReducer.allUsers,
    profileData: state.profileReducer.profileData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetProfile: (value) => dispatch(getProfile(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
