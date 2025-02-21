import React from "react";
import noImage from "../../../../assets/images/noImage.png";
import { BiTrash } from "react-icons/bi";
import { axiosInstances } from "../../../../config/config";

const TeamListItem = (props) => {
  const { team,deleteEmployee } = props;
  

  return (
    team &&
    team.length > 0 &&
    team.map((item) => (
      <div key={item?.id} className="flex w-full justify-between p-2 lg:p-6 bg-white shadow-lg rounded-lg">

        <div className="flex items-center sm:flex-row flex-col gap-9   ">
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
        <span className="cursor-pointer text-red-700 mt-2 transition-colors duration-200 ease-linear" onClick={() => deleteEmployee(item.id)}>
          <BiTrash size={28} />
        </span>
      </div>
    ))
  );
};

export default TeamListItem;
