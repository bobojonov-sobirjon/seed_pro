import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ProjectDetails } from "../../../components";
import WorkPositionCard from "../../../components/work-position-card/WorkPositionCard";
import ReplyOwner from "./ReplyOwner";
import ProjectResponse from "./components/ProjectResponse";
import { axiosInstances } from "../../../config/config";
import TeamListItem from "./components/TeamList";

const ProjectsDetails = () => {
  const { t } = useTranslation();
  // console.log(state, "state");
  const [datas, setDatas] = useState();
  const { id } = useParams();

  const getProjects = async () => {
    try {
      const res = await axiosInstances.get(`/project/${id}`);
      setDatas(res.data);
    } catch (error) {
      console.log("error");
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
    <div className="max-w-5xl mx-auto my-10">
      <ProjectDetails data={datas} />
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
        {datas && datas.komanda.length > 0 && (
          <h2 className="text-[22px] lg:text-[25px] text-custom-gray font-gunterz">
            {t("extraComponents.projectsDetails.open_position")}
          </h2>
        )}

        {datas &&
          datas.komanda?.length > 0 &&
          datas.komanda.map(
            (item) =>
              item?.length > 0 &&
              item.map((elem) => <WorkPositionCard key={elem.id} item={elem} />)
          )}
        {datas?.reply_owner?.length > 0 ? (
          <>
            <h2 className="text-[22px] lg:text-[25px] text-custom-gray font-gunterz mt-14 uppercase">
              отклик на проект
            </h2>
            <ReplyOwner state={datas} />
          </>
        ) : (
          ""
        )}

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
    </div>
  );
};

export default ProjectsDetails;
