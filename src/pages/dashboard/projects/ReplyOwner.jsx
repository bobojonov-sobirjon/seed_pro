import React, { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Cookies from 'universal-cookie';
import noImage from '../../../assets/images/noImage.png';
import { useAuth } from '../../../services/useAuth';
import { axiosInstances } from '../../../config/config';
import { getToastWarn } from '../../../utils/options';
import { getProfile } from '../../../redux/reducers/profileReducer';
import Loading from '../../../components/Loading';
import { MessageCircle, MessageSquare, MessageSquareMoreIcon, X } from 'lucide-react';

function ReplyOwner(props) {
    const { state } = props;
    let { user_id } = useAuth();
    const navigate = useNavigate();
    const cookie = new Cookies();
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOPen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    // get profile
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        props.onGetProfile({ signal }); // get profile

        return () => controller.abort();
    }, []);

    // navigate handler
    const navigateHandler = item => {
        navigate("/admin/specializations/specialization-detail", { state: { ...item, isChange: true } });
    }

    // console.log(state);

    // navigate chat handler
    const navigateChatHandler = async item => {
        if (props.profileData && typeof props.profileData === 'object' && props.profileData.hasOwnProperty("id")) {
            setLoading(true);
            let obj = {
                receiver: item.owner,
                senderId: user_id,
                text: "",
                project: item.owner,
                state: state
            }

            // create room
            const r = await axiosInstances.post("/chat/create_room/", {
                email: props.profileData?.email
            });


            if (r.status === 200 || r.status === 201 || r.status == 204) {
                // get room
                const response = await axiosInstances.get(`/chat/rooms/`);

                if (response.data?.length > 0) {
                    let t = {};
                    response.data.forEach(elem => {
                        if ((elem.initiator?.id == item.owner?.id && elem.receiver?.id == user_id) || (elem.initiator?.id == user_id && elem.receiver?.id == item.owner?.id)) t = { ...elem };
                    });
                    // console.log(t);

                    if (t && typeof t === 'object' && t.hasOwnProperty("id")) {
                        const res = await axiosInstances.get(`/chat/conversation/${t?.id}/`);

                        if (res.status === 200 || res.status === 201 || res.status == 204) {
                            // console.log(res.data);

                            let soc = new W3CWebSocket(`${import.meta.env.VITE_SOCKET_SERVER_URL}message/${res.data?.id}/?token=${cookie.get("user")}`);
                            if (soc) {
                                if (item.description) {
                                    let msg = new W3CWebSocket(`${import.meta.env.VITE_SOCKET_SERVER_URL}chat/${res.data?.id}/?token=${cookie.get("user")}`);
                                    msg.onopen = () => {
                                        msg.send(
                                            JSON.stringify({
                                                message: item.description,
                                                info: ""
                                            })
                                        );
                                    };
                                }
                            }
                            setLoading(false);
                            setTimeout(() => {
                                navigate("/admin/messages", { state: obj });
                            }, 50);
                        } else {
                            getToastWarn(res.data || res.data?.message);
                            setLoading(false);
                        }
                    } else setLoading(false);
                } else setLoading(false);
                // setUsers(response.data);
            } else {
                getToastWarn(r.data || r.data?.message || "Не найдено.");
                setLoading(false);
            }
        }
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    const openModal = (id) => {
        setIsOPen(true);
        state?.replay_owner?.forEach(item => {
            if (item.id === id) {
                setSelectedItem(item);
            }
        })
    }


    return (
        state && state.replay_owner?.length > 0 && state.replay_owner.map(item => (
            <div key={item.id} className='p-4 lg:p-6 bg-white shadow-sm shadow-black rounded-lg'>
                <div className='flex items-center justify-between flex-wrap'>
                    <div className='flex gap-4 items-center'>
                        {(item.owner?.avatar && item.owner?.avatar !== "https://api.startap-seed.ru/media/avatar/404-error.png") ? (
                            <img src={item.owner?.avatar} alt="no image" />
                        ) : (
                            <div className='h-[60px] lg:h-[90px] w-[60px] lg:w-[90px] rounded-full bg-black relative'>
                                <img src={noImage} alt="no image" className='absolute inset-0 m-auto w-[30px] h-[30px]' />
                            </div>
                        )}
                        <div>
                            <div className='flex items-center gap-3 flex-wrap'>
                                <span className='font-gilroy_bold text-[17px] lg:text-[18px]'>{item.owner?.first_name} {item.owner?.last_name}</span>
                                <span
                                    className='underline text-[12px] font-gilroy_semibold text-[#A7A5A5] lg:pt-0.5 cursor-pointer hover:text-[#a7a5a5e7] transition-all'
                                    onClick={() => navigateHandler(item.owner)}
                                >
                                    Посмотреть профиль
                                </span>
                                <button
                                    onClick={() => openModal(item.id)}
                                    className='underline text-[12px] lg:flex hidden font-gilroy_semibold text-black lg:pt-0.5 cursor-pointer hover:text-red-600 transition-all'
                                >Смотреть сообщения</button>
                            </div>
                            <button
                                onClick={() => openModal(item.id)}
                                className='underline text-[12px] lg:hidden font-gilroy_semibold text-black lg:pt-0.5 cursor-pointer hover:text-red-600 transition-all'
                            >Смотреть сообщения</button>
                            <div>
                                {item.owner?.information?.length > 0 && item.owner.information.map(elem => (
                                    <div key={elem.id} className='text-text-main_green text-[14px] font-gilroy_semibold flex gap-1'>
                                        <span>{elem.career_objective}</span>
                                        <span>{elem.level}</span>
                                    </div>
                                ))}
                            </div>
                            <div className='mt-[14px] gap-1 flex items-center flex-wrap'>
                                {item.owner?.information?.length > 0 && item.owner.information.map(elem => (
                                    elem.skills && elem.skills.split(",").map(e => (
                                        <div key={Math.random().toString()} className='rounded-[5px] bg-custom-gray py-[3px] lg:py-[6px] max-w-max px-[6px] lg:px-[12px] text-white font-gilroy_bold text-[12px] lg:text-[14px]'>
                                            {e}
                                        </div>
                                    ))
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-end mt-2 lg:mt-0 w-full lg:w-max'>
                        <button
                            className={`bg-black font-gilroy_semibold lg:w-auto w-full hover:bg-[#000000e6] text-center transition-all text-white py-2 lg:py-4 px-8 text-[13px] rounded focus:outline-none focus:shadow-outline ${loading ? 'cursor-not-allowed' : 'cursor-pointer'} flex items-center justify-center gap-2`}
                            onClick={() => navigateChatHandler(item)}
                            disabled={loading}
                        >
                            {/* {loading && <Loading />} Подтвердить и перейти в чат */}
                            Подтвердить и перейти в чат
                        </button>
                    </div>
                </div>

                {isOpen && (
                    <div className='fixed top-0 left-0 z-50 h-screen w-screen bg-black/20 bg-opacity-70 backdrop-filter backdrop-blur-sm flex items-center justify-center'>
                        <div className='w-[600px] border-2 border-main-green min-h-[100px] flex flex-col gap-4 bg-white rounded-lg p-4 relative'>
                            <div className='flex w-full flex-col'>
                                <p className='text-[18px]  font-montserrat font-semibold uppercase text-center'>сообщения</p>
                            </div>
                            {/* Clear icon */}
                            <div className='absolute top-4 right-4 border border-black rounded-md active:scale-[0.95] text-black cursor-pointer' onClick={() => setIsOPen(false)}>
                                <X size={18} color='black' />
                            </div>


                            <p>
                                <span className='font-montserrat font-semibold text-sm text-pink-800'>[{selectedItem?.owner?.first_name} {selectedItem?.owner?.last_name}]:</span>
                                <span>{" " + selectedItem?.description}</span>
                            </p>
                        </div>
                    </div>
                )}
            </div>
        ))
    )
}

const mapStateToProps = state => {
    return {
        profileData: state.profileReducer.profileData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetProfile: (value) => dispatch(getProfile(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(ReplyOwner));