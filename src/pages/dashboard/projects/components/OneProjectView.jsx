import React, { memo, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import OneProjectData from "./OneProjectData";
import ReplyForm from "./ReplyForm";
import Modal from "../../../../components/modal/Modal";
import { useAuth } from "../../../../services/useAuth";
import { axiosInstances } from "../../../../config/config";
import {
  getToast,
  getToastError,
  getToastWarn,
} from "../../../../utils/options";
import TeamListItem from "./TeamList";
import ProjectResponse from "./ProjectResponse";
// import { errorHandler, getToast, getToastWarn } from '../../../../utils/options';
// import { axiosInstances } from '../../../../config/config';
// import { IoStarOutline } from 'react-icons/io5';
// import { axiosInstances } from '../../../../config/config';
// import { errorHandler, getToast, getToastWarn } from '../../../../utils/options';

function OneProjectView(props) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { state } = useLocation();
  let { user_id } = useAuth();
  const [openReplyModal, setOpenReplyModal] = useState({
    open: false,
    data: {},
  });

  // console.log(state);
  // console.log(user_id);

  // open add unit modal
  const openReplyModalHandler = useCallback((value, fullState) => {
    setOpenReplyModal({ open: true, data: { value, state: fullState } });
  }, []);

  // close add unit modal
  const closeReplyModalHandler = useCallback(() => {
    setOpenReplyModal({ open: false, data: {} });
  }, []);
  // const navigate = useNavigate();

  // add favorite
  // const addFavorite = async d => {
  //     try {
  //         const res = await axiosInstances.post("/favourite/", {
  //             project: d.id,
  //         });
  //         // console.log(res);
  //         if (res.status === 200 || res.status === 201) {
  //             getToast("Успешно добавлено в избранное.");
  //             navigate("/admin/projects");
  //         } else getToastWarn(res.data?.message || "Попробуйте еще раз.");
  //     } catch (error) {
  //         // console.log(error);
  //         errorHandler(error);
  //     }
  // }

  // reply handler
  const replyHandler = async (value) => {
    // let obj = {
    //     receiver: state?.owner,
    //     senderId: user_id,
    //     text: value.description,
    //     project: state
    // }
    // navigate("/admin/messages", { state: obj });

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
                  src={state ? state.project_image : ""}
                  alt="no image"
                  className="w-hull h-full rounded-full"
                />
              </div>
              <div className="flex-1">
                <h3 className="lg:text-lg text-md font-bold text-custom-gray">
                  {state ? state.name : ""}
                </h3>
                <p className="text-gray-600 text-sm">
                  {state ? state.description : ""}
                </p>
              </div>
            </div>
          </div>

          {/* <div className='absolute top-[30%] right-4' onClick={() => addFavorite(data)}>
                    <IoStarOutline className='text-3xl text-gray-500' />
                </div> */}
        </div>

        <div className="my-14 flex flex-col gap-2">
          <h2 className="text-xl lg:text-2xl text-custom-gray font-gunterz lg:text-left">
            Список команды
          </h2>
          <div className="flex flex-col gap-4 mt-4">
            <TeamListItem team={state?.group_emp_list} />
          </div>
        </div>
        <div className="my-14 flex flex-col gap-2">
          <h2 className="text-xl lg:text-2xl text-custom-gray font-gunterz lg:text-left">
            {t("dashboard.pages.one_project_view.open_position")}
          </h2>
          <OneProjectData
            state={state}
            openReplyModalHandler={openReplyModalHandler}
          />
        </div>

        <div className="my-14 flex flex-col gap-2">
          <h2 className="text-xl lg:text-2xl text-custom-gray font-gunterz lg:text-left">
            отклик на проект
          </h2>
          <div className="flex flex-col gap-4 mt-4">
            <ProjectResponse project={state?.reply_to_project} />
          </div>
        </div>
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
