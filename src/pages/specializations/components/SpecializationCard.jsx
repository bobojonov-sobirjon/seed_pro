import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import { Button } from "@material-tailwind/react";
import user from "../../../assets/images/noImage.png";
// import { axiosInstances } from '../../config/config';
// import { errorHandler, getToast, getToastWarn } from '../../utils/options';

const SpecializationCard = (props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data } = props;

  // navigate handler
  const navigateHandler = (item) => {
    navigate(`/admin/specializations/specialization-detail/${item.id}`, {
      state: item,
    });
  };
  return (
    <>
      {data &&
      data?.results &&
      Array.isArray(data.results) &&
      data.results?.length > 0 ? (
        data.results.map((item) => (
          <div
            key={Math.random().toString()}
            className="flex items-start p-6 gap-4 bg-white shadow-lg rounded-lg cursor-pointer"
            onClick={() => navigateHandler(item)}
          >
            <div className="h-14 lg:h-20 w-14 lg:w-20 flex justify-center items-center bg-black rounded-full">
              {item?.avatar ? (
                <img
                  className="w-full h-full rounded-full text-[10px] object-cover"
                  src={item.avatar}
                  alt="Нет изображения"
                />
              ) : (
                <img
                  className="text-[10px] w-[40px] h-[40px]"
                  src={user}
                  alt="Нет изображения"
                />
              )}
            </div>
            <div className="ml-4 -mt-1">
              <div className="text-custom-gray font-gilroy_bold text-[18px] lg:text-[20px]">
                {item.first_name} {item.last_name}
              </div>
              {item.information?.length > 0 &&
                item.information.map((elem) => (
                  <section key={Math.random().toString()}>
                    <div className="text-text-main_green font-gilroy_semibold text-[14px] lg:text-[15px]">
                      {elem.career_objective} &nbsp;{elem.level}
                    </div>
                    <div className="mt-3 flex gap-2 flex-wrap">
                      {elem.skills &&
                        elem.skills?.length > 0 &&
                        elem.skills.split(",").map((el) => (
                          <Button
                            key={Math.random().toString()}
                            placeholder={<div />}
                            variant="filled"
                            className={`p-1 lg:p-3 rounded-md bg-custom-gray text-[11px] lg:text-[12px] font-gilroy_bold`}
                          >
                            {el}
                          </Button>
                        ))}
                    </div>
                  </section>
                ))}
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center mt-4">
          <span className="text-gray-500">
            {t("extraComponents.specializationCard.not_found")}
          </span>
        </div>
      )}

      {/* pagination */}
      {data && data?.results?.length > 0 && (
        <div className="mt-4">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={props.handlePageClick}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            pageCount={Math.ceil(data.count / props.limit)}
            previousLabel="<"
            renderOnZeroPageCount={null}
            className="paginationUL"
            activeClassName="active"
            forcePage={props.selected}
          />
        </div>
      )}
    </>
  );
};

export default memo(SpecializationCard);
