import React from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ProjectDetails } from "../../../components";
import WorkPositionCard from "../../../components/work-position-card/WorkPositionCard";
import ReplyOwner from "./ReplyOwner";
import Employee from "../../../components/work-position-card/Employee";

const ProjectsDetails = () => {
  const { state } = useLocation();
  const { t } = useTranslation();
  // console.log(state, "state");

  return (
    <div className="max-w-5xl mx-auto my-10">
      <ProjectDetails data={state} />
      {/* Список команды */}
      <div className="my-14 flex flex-col gap-2">
        <h2 className="text-[22px] lg:text-[25px] text-custom-gray font-gunterz">
          {"Список команды"}
        </h2>
        {state?.group_emp_list?.map((elem) => (
          <Employee key={elem.id} item={elem?.employee} />
        ))}
      </div>
      <div className="my-14 flex flex-col gap-2">
        <h2 className="text-[22px] lg:text-[25px] text-custom-gray font-gunterz">
          {t("extraComponents.projectsDetails.open_position")}
        </h2>
     
        {state &&
          state.komanda?.length > 0 &&
          state.komanda.map(
            (item) =>
              item?.length > 0 &&
              item.map((elem) => <WorkPositionCard key={elem.id} item={elem} />)
          )}
        {state?.reply_owner?.length > 0 ? (
          <>
            <h2 className="text-[22px] lg:text-[25px] text-custom-gray font-gunterz mt-14 uppercase">
              отклик на проект
            </h2>
            <ReplyOwner state={state} />
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProjectsDetails;
