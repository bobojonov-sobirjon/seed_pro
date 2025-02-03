import React, { useState } from "react";
import noImage from "../../../../assets/images/noImage.png";
import { Link } from "react-router-dom";
import { SendModal } from "../../../../components";

const ProjectResponse = (props) => {
    const { project } = props;
     const [openSendModal, setSendApplyModal] = useState(false);
      const handleClose = () => setSendApplyModal(false);
  return project && project.length>0 && project.map(item=>
    (
        <div
        key={item?.id}
        className="flex sm:flex-row flex-col md:gap-0 gap-6 justify-between items-center p-2 lg:p-6 bg-white shadow-lg rounded-lg"
      >
        <div className="flex sm:flex-row items-center flex-col lg:gap-9 gap-5">
          <div className="w-[96px] h-[96px] flex items-center justify-center p-7 bg-black rounded-full">
            <img src={item?.avatar || noImage} alt="" />
          </div>
          <div className="flex flex-col sm:items-start items-center">
            <div className="flex items-center gap-[14px]">
              {" "}
              <h3 className="text-xl leading-[22px] font-bold text-custom-gray">
                {item?.first_name} {item?.last_name}
              </h3>
                <p className="text-[13px] leading-5 font-semibold text-[#A7A5A5] underline">
                  Посмотреть профиль
                </p>
            </div>
            <span className="text-4 leading-6 font-semibold text-main-green mt-1">
              {item?.information?.length > 0 &&
                `${item?.information[0]?.laguage} ${item?.information[0]?.level}`}{" "}
            </span>
            {/* Skills list */}
            <div className="flex flex-wrap gap-[10px] mt-3">
              {item?.information[0] &&
                item?.information[0]?.skills &&
                item?.information[0]?.skills
                  .split(",")
                  .map((e) => (
                    <span className="w-max h-[42px] rounded-[5px] flex items-center justify-center px-3 bg-custom-gray text-white ">
                      {e}
                    </span>
                  ))}
            </div>
          </div>
        </div>
        <button
          className="md:px-10 px-7 py-5 bg-black text-white rounded-[4px]"
          onClick={() => setSendApplyModal(true)}
        >
          Подтвердить и перейти в чат
        </button>
        <SendModal
          isOpen={openSendModal}
          onClose={handleClose}
          data={project[0]}
        />
      </div>
      )
  )
  
}

export default ProjectResponse