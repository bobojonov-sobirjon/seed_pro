import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ProfileCard,
SendModal,
  SpecializationDetailsCard,
} from "../../components";

const SpecializationsDetails = () => {
  const { state } = useLocation();
  const { t } = useTranslation();
  const [openSendModal, setSendApplyModal] = useState(false);

  const handleClose = () => setSendApplyModal(false);
  const handleSend = () => setSendApplyModal(true);

  // navigate chat
  const navigateChatHandler = () => {};
  return (
    <div className="max-w-5xl mx-auto py-5">
      <ProfileCard user={state} />

      <div className="flex flex-col gap-6 mt-10">
        <div className="mt-8">
          <h1 className="text-custom-gray lg:text-2xl text-lg font-gunterz">
            {t("dashboard.header.specialists.details.title")}
          </h1>
        </div>

        <div>
          <SpecializationDetailsCard user={state} />
        </div>

        <div className="flex justify-end gap-2 w-full lg:w-auto font-gilroy_semibold text-[13px]">
          {state && state.hasOwnProperty("isChange") && state.isChange ? (
            <button
              type="button"
              onClick={handleSend}
              className="h-[50px] w-full lg:w-auto lg:px-16 lg:mt-0 mt-2 bg-[#000000e4] hover:bg-[#000000e4] text-white rounded-md"
            >
              Назначить специалиста
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSend}
              className="h-[50px] w-full lg:w-auto lg:px-16 lg:mt-0 mt-2 bg-text-main_green text-white rounded-md"
            >
              {t(
                "dashboard.header.specialists.details.send_invite_button_text"
              )}
            </button>
          )}
        </div>
      </div>

      <SendModal isOpen={openSendModal} onClose={handleClose} data={state} />
    </div>
  );
};

export default SpecializationsDetails;
