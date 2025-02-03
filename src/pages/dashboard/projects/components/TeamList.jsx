import React, { useState } from "react";
import noImage from "../../../../assets/images/noImage.png";
import { Link } from "react-router-dom";
import { SendModal } from "../../../../components";

const TeamListItem
 = (props) => {
  const [openSendModal, setSendApplyModal] = useState(false);
  const handleClose = () => setSendApplyModal(false);
  const { team } = props;
  console.log("employee", team);
  return (
   team && team.length>0 &&
    team.map((item) =>
      item?.employee ? (
        <div
          key={item?.id}
          className="flex sm:flex-row flex-col items-center gap-9 p-2 lg:p-6 bg-white shadow-lg rounded-lg"
        >
          <div className="w-[96px] h-[96px] flex items-center justify-center p-7 bg-black rounded-full">
            <img src={item?.employee?.avatar || noImage} alt="" />
          </div>
          <div className="flex flex-col sm:items-start items-center">
            <h3 className="text-xl leading-[22px] font-bold text-custom-gray">
              {item?.employee?.first_name} {item?.employee?.last_name}
            </h3>
            <span className="text-4 leading-6 font-semibold text-main-green mt-1">
              {item?.employee?.information?.length > 0 &&
                `${item?.employee?.information[0]?.laguage} ${item?.employee?.information[0]?.level}`}
            </span>
            {/* Skills list */}
            <div className="flex flex-wrap gap-[10px] mt-3">
              {item?.employee?.information[0]?.skills &&
                item?.employee?.information[0]?.skills
                  .split(",")
                  .map((e) => (
                    <span className="w-max h-[42px] rounded-[5px] flex items-center justify-center px-3 bg-custom-gray text-white ">
                      {e}
                    </span>
                  ))}
            </div>
          </div>
        </div>
      ) : (
     ""
      )
    )
  );
};

export default TeamListItem
;
