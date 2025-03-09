import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoIosTrash } from "react-icons/io";
import { LiaEdit } from "react-icons/lia";

const ProjectCard = (props) => {
  const { data } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  // navigate
  const navigateHandler = (item) => {
    navigate(`/admin/projects/details/${item.id}`);
  };

  return (
    data?.length > 0 &&
    data.map((item) => {
      let all_number = 0,
        all_peoples = 0;
      if (Array.isArray(item.employees) && item.employees?.length > 0) {
        item.employees.forEach((el) => {
          if (el?.length > 0) {
            el.forEach((elementy) => {
              all_number += Number(elementy.people_needed);
              all_peoples += Number(elementy.people_now);
            });
          }
        });
      }
      return (
        <div
          key={item.id}
          className="bg-white p-4 lg:p-8 shadow-xl rounded-lg mb-6 flex flex-col md:flex-row justify-between lg:items-center"
        >
          <div className="flex flex-1 items-center relative">
            <div className="flex items-center justify-center h-[50px] lg:h-20 w-[50px] lg:w-20 rounded-full mr-2 lg:mr-4">
              <img
                src={item.project_image}
                alt="no image"
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="flex-1">
              <h3 className="lg:text-lg text-md font-bold text-custom-gray">
                {item.name}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2 ">
                {item.description}
              </p>

              <div className="flex items-center gap-1 mt-2">
                <div className="text-gray-600 text-sm w-[80%] lg:w-[200px] border border-gray-300 h-[9px] relative">
                  <div
                    className={`absolute top-0 left-0 bottom-0 bg-text-main_green h-[9px]`}
                    style={{
                      width: all_peoples
                        ? (all_peoples / all_number) * 100 + "%"
                        : "0%",
                    }}
                  ></div>
                </div>
                <span className="font-gunterz-bold text-[12px]">
                  (
                  {all_peoples
                    ? all_peoples + " / " + all_number
                    : 0 + " / " + all_number}
                  )
                </span>
              </div>
            </div>
            {/* For mobile, icons align next to title/description but wrap below on smaller screens */}
            <div className="flex md:hidden ml-2 absolute top-0 right-0">
              <button
                className="text-gray-600 hover:text-gray-900"
                onClick={() => props.openDeleteModalHandler(item)}
              >
                <IoIosTrash className="text-2xl text-custom-gray mr-2" />
              </button>
              <button
                className="text-gray-600 hover:text-gray-900"
                onClick={() => props.openUpdateModalHandler(item)}
              >
                <LiaEdit className="text-2xl text-custom-gray" />
              </button>
            </div>
          </div>

          {/* Adjusting layout for mobile to align view button below icons */}
          <div className="flex md:flex-col md:items-end items-start mt-4 md:mt-0 w-full md:w-auto">
            <div className="hidden md:flex justify-end w-full md:w-auto">
              <button
                className="text-gray-600 hover:text-gray-900 mr-2"
                onClick={() => props.openDeleteModalHandler(item)}
              >
                <IoIosTrash className="text-2xl text-custom-gray" />
              </button>
              <button
                className="text-gray-600 hover:text-gray-900 mr-2"
                onClick={() => props.openUpdateModalHandler(item)}
              >
                <LiaEdit className="text-2xl text-custom-gray" />
              </button>
            </div>
            <div className="mt-2 md:mt-10 w-full">
              <button
                onClick={() => navigateHandler(item)}
                className="cursor-pointer block border border-main-green hover:bg-main-green hover:text-white transition-all text-main-green p-3 px-6 rounded focus:outline-none w-full focus:shadow-outline"
              >
                {t("extraComponents.projectCard.look_text")}
              </button>
            </div>
          </div>
        </div>
      );
    })
  );
};

export default memo(ProjectCard);
