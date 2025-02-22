import React, { memo, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import OneProjectData from "./OneProjectData";
import ReplyForm from "./ReplyForm";
import Modal from "../../../../components/modal/Modal";
import { axiosInstances } from "../../../../config/config";
import {
  getToast,
  getToastError,
  getToastWarn,
} from "../../../../utils/options";
import TeamListItem from "./TeamList";
import ProjectResponse from "./ProjectResponse";
import { useAuth } from "../../../../services/useAuth";

function OneProjectView(props) {
  const { t } = useTranslation();
  const { user_id } = useAuth();
  const [datas, setDatas] = useState();
  const [openReplyModal, setOpenReplyModal] = useState({
    open: false,
    data: {},
  });

  const { id } = useParams();

  // console.log(state);
  // console.log(user_id);

  const getProjects = async () => {
    try {
      const res = await axiosInstances.get(`/project/${id}`);
      setDatas(res.data);
    } catch (error) {
      console.log("error");
    }
  };

  // open add unit modal
  const openReplyModalHandler = useCallback((value, fullState) => {
    setOpenReplyModal({ open: true, data: { value, state: fullState } });
  }, []);

  // close add unit modal
  const closeReplyModalHandler = useCallback(() => {
    setOpenReplyModal({ open: false, data: {} });
  }, []);
  // const navigate = useNavigate();

  // reply handler
  const replyHandler = async (value) => {
    let obj = {
      receiver: datas?.owner,
      senderId: user_id,
      text: value.description,
      project: datas,
    };
    localStorage.setItem("state", JSON.stringify(obj));
    // navigate("/admin/messages", { state: obj })
    try {
      const res = await axiosInstances.post("/reply/project/", value);

      if (res.status == 201 || res.status == 200 || res.status == 204) {
        getToast(t("toastMessage.allProjectsDataPage.reply_project"));
        closeReplyModalHandler();
      } else
        getToastWarn(res?.message || res.data?.message || "Произошла ошибка.");
    } catch (error) {
      // console.log(error);

      getToastError(
        error?.response?.data?.error || "На сервере произошла ошибка."
      );
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axiosInstances.delete(`/delete/employee/project/${id}`);
      getProjects();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProjects();
  }, []);

  return (
    <>
      <div className="max-w-5xl mx-auto my-10">
        <div className="mb-6">
          <span className="font-gunterz lg:text-2xl text-xl text-custom-gray lg:text-left text-center block">
            {t("dashboard.pages.one_project_view.title")}
          </span>
        </div>

        <div className="flex items-center justify-between relative">
          <div className="flex flex-1 items-center">
            <div className="bg-white p-2 lg:p-4 py-6 w-full shadow rounded-lg mb-4 min-h-[100px] flex items-center">
              <div className="flex items-center justify-center h-[80px] w-[80px] rounded-full text-white mr-4 border">
                <img
                  src={datas ? datas.project_image : ""}
                  alt="no image"
                  className="w-hull h-full rounded-full"
                />
              </div>
              <div className="flex-1">
                <h3 className="lg:text-lg text-md font-bold text-custom-gray">
                  {datas ? datas.name : ""}
                </h3>
                <p className="text-gray-600 text-sm">
                  {datas ? datas.description : ""}
                </p>
              </div>
            </div>
          </div>

          {/* <div className='absolute top-[30%] right-4' onClick={() => addFavorite(data)}>
                    <IoStarOutline className='text-3xl text-gray-500' />
                </div> */}
        </div>
        {datas && datas?.group_emp_list?.length > 0 ? (
          <div className="my-14 flex flex-col gap-2">
            <h2 className="text-xl lg:text-2xl text-custom-gray font-gunterz lg:text-left">
              Список команды
            </h2>
            <div className="flex flex-col gap-4 mt-4">
              <TeamListItem
                team={datas?.group_emp_list}
                deleteEmployee={deleteEmployee}
              />
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="my-14 flex flex-col gap-2">
          <h2 className="text-xl lg:text-2xl text-custom-gray font-gunterz lg:text-left">
            {t("dashboard.pages.one_project_view.open_position")}
          </h2>
          <OneProjectData
            state={datas}
            openReplyModalHandler={openReplyModalHandler}
          />
        </div>
        {datas?.reply_to_project.length > 0 ? (
          <div className="my-14 flex flex-col gap-2">
            <h2 className="text-xl lg:text-2xl text-custom-gray font-gunterz lg:text-left">
              отклик на проект
            </h2>
            <div className="flex flex-col gap-4 mt-4">
              <ProjectResponse replyUser={datas?.reply_to_project} />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      {/* open reply modal */}
      {openReplyModal.open && (
        <Modal
          closeModal={() => {}}
          open={openReplyModal.open}
          maxWidth="sm:max-w-4xl"
        >
          <ReplyForm
            closeModal={closeReplyModalHandler}
            element={openReplyModal.data}
            replyHandler={replyHandler}
          />
        </Modal>
      )}
    </>
  );
}

export default memo(OneProjectView);
