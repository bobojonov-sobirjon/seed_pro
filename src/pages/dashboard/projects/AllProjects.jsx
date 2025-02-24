import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { Typography } from "@material-tailwind/react";
import { CiSearch } from "react-icons/ci";
import { getAllPorjects } from "../../../redux/reducers/projectReducer";
import AllProjectsData from "./components/AllProjectsData";
import { getToastWarn, levels } from "../../../utils/options";
import {
  getAllAbout,
  getAllCourses,
  getAllEducations,
  getAllExperience,
  getProfile,
} from "../../../redux/reducers/profileReducer";

const AllProjects = (props) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(0);
  const [level, setLevel] = useState(-1);
  const [position, setPosition] = useState("");
  const position_ref = useRef("");

  // get all projects
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    props.onGetProfile({ signal }); // get profile
    props.onGetAllPorjects({
      signal,
      selectedId: selected + 1,
      limit: 15,
      komanda_position: "",
      komanda_level: "",
    }); // get profile
    props.onGetAllExperience({ signal }); // get experience
    props.onGetAllEducations({ signal }); // get education
    props.onGetAllCourses({ signal }); // get all course
    props.onGetAllAbout({ signal }); // get all about

    return () => controller.abort();
  }, []);

  // for pagination
  const handlePageClick = async (e) => {
    setSelected(e.selected);
    props.onGetAllPorjects({
      selectedId: e.selected + 1,
      limit: 15,
      komanda_position: position_ref.current?.value,
      komanda_level: level == -1 ? "" : level,
    }); //get all data
  };

  // search elements
  const searchElementsHandler = () => {
    if (position_ref.current?.value || level) {
      setPosition(position_ref.current?.value);
      props.onGetAllPorjects({
        selectedId: selected + 1,
        limit: 15,
        komanda_position: position_ref.current?.value,
        komanda_level: level == -1 ? "" : level,
      }); //get all data
    } else getToastWarn(t("toastMessage.allProjectsPage.fill_full"));
  };
  return (
    <div className="max-w-5xl mx-auto my-10 mb-2">
      <main>
        {props.loading ? (
          <div className="max-w-full animate-pulse">
            <Typography
              as="div"
              variant="h1"
              className="mb-6 h-[127px] w-full rounded-xl bg-gray-300"
            >
              &nbsp;
            </Typography>
            <Typography
              as="div"
              variant="h1"
              className="mb-4 h-[127px] w-full rounded-xl bg-gray-300"
            >
              &nbsp;
            </Typography>
            <Typography
              as="div"
              variant="h1"
              className="mb-4 h-[127px] w-full rounded-xl bg-gray-300"
            >
              &nbsp;
            </Typography>
          </div>
        ) : props.profileData &&
          props.profileData?.information?.length > 0 &&
          props.allExperience?.length > 0 &&
          props.allAbout?.length > 0 &&
          !props.profileData.active ? (
          <div>
            <>
              <h1 className="text-custom-gray mt-7 font-gunterz lg:text-2xl text-xl text-center lg:text-left">
                {t("dashboard.pages.search_project.title")}
              </h1>

              <div className="flex lg:flex-row flex-col lg:gap-0 gap-2 lg:items-center space-x-4 py-8 pt-4">
                <div className="gap-3 grid grid-cols-1 lg:grid-cols-10">
                  <div className="flex items bg-blue-300 shadow rounded overflow-hidden h-[47.97px] col-span-1 lg:col-span-3">
                    <input
                      className="px-4 flex-1 py-2 outline-0"
                      type="text"
                      placeholder={t(
                        "dashboard.pages.search_project.job_title_input_placeholder"
                      )}
                      defaultValue={position}
                      ref={position_ref}
                    />
                    <button className="bg-white px-4 text-xl text-gray-600">
                      <CiSearch />
                    </button>
                  </div>

                  <div className="h-[47.97px] selectMaterial col-span-1 lg:col-span-2">
                    <select
                      name="level"
                      id="level"
                      value={level}
                      className="text-gray-600 text-sm shadow w-full rounded-lg focus:ring-blue-500 outline-none focus:border-blue-500 block px-0 lg:px-2 h-[47.97px]"
                      onChange={(event) => setLevel(event.target.value)}
                    >
                      <option value={-1}>
                        {t("dashboard.pages.search_project.all_option")}
                      </option>
                      {levels?.length > 0 &&
                        levels.map((elem) => (
                          <option key={elem.value} value={elem.value}>
                            {elem.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <button
                    className="col-span-1 p-3 px-10 bg-custom-gray text-white rounded-md lg:col-span-2"
                    onClick={searchElementsHandler}
                  >
                    {t("dashboard.pages.search_project.search_button_text")}
                  </button>
                  {/* {!props.profileData?.active && (
                      <Link to="/admin/create-project" className='col-span-1 lg:col-span-2 w-full'>
                        <button className='p-3 px-6 bg-main-green text-white rounded-md w-full'>
                          Создать проект
                        </button>
                      </Link>
                    )} */}
                </div>
              </div>

              {props.allProjects && props.allProjects?.results?.length === 0 ? (
                <div className="flex justify-center mt-4">
                  <span className="text-gray-500">
                    {t("dashboard.pages.search_project.alert_not_found")}
                  </span>
                </div>
              ) : (
                <div>
                  <AllProjectsData
                    data={props.allProjects}
                    handlePageClick={handlePageClick}
                    limit={15}
                    selected={selected}
                  />
                </div>
              )}
            </>
          </div>
        ) : props.profileData && props.profileData.active ? (
          <div>
            <>
              <h1 className="text-custom-gray mt-7 font-gunterz lg:text-2xl text-xl text-center lg:text-left">
                {t("dashboard.pages.search_project.title")}
              </h1>

              <div className="flex lg:flex-row flex-col lg:gap-0 gap-2 lg:items-center space-x-4 py-8 pt-4">
                <div className="gap-3 grid grid-cols-1 lg:grid-cols-10">
                  <div className="flex items bg-blue-300 shadow rounded overflow-hidden h-[47.97px] col-span-1 lg:col-span-3">
                    <input
                      className="px-4 flex-1 py-2 outline-0"
                      type="text"
                      placeholder={t(
                        "dashboard.pages.search_project.job_title_input_placeholder"
                      )}
                      defaultValue={position}
                      ref={position_ref}
                    />
                    <button className="bg-white px-4 text-xl text-gray-600">
                      <CiSearch />
                    </button>
                  </div>

                  <div className="h-[47.97px] selectMaterial col-span-1 lg:col-span-2">
                    <select
                      name="level"
                      id="level"
                      value={level}
                      className="text-gray-600 text-sm shadow w-full rounded-lg focus:ring-blue-500 outline-none focus:border-blue-500 block px-0 lg:px-2 h-[47.97px]"
                      onChange={(event) => setLevel(event.target.value)}
                    >
                      <option value={-1}>
                        {t("dashboard.pages.search_project.all_option")}
                      </option>
                      {levels?.length > 0 &&
                        levels.map((elem) => (
                          <option key={elem.value} value={elem.value}>
                            {elem.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <button
                    className="col-span-1 p-3 px-10 bg-custom-gray text-white rounded-md lg:col-span-2"
                    onClick={searchElementsHandler}
                  >
                    {t("dashboard.pages.search_project.search_button_text")}
                  </button>
                  {props.profileData?.active &&
                    props.profileData?.groups[0] === 1 && (
                      <Link
                        to="/admin/create-project"
                        className="col-span-1 lg:col-span-2 w-full"
                      >
                        <button className="p-3 px-6 bg-main-green text-white rounded-md w-full">
                          {t(
                            "dashboard.pages.search_project.create_button_text"
                          )}
                        </button>
                      </Link>
                    )}
                </div>
              </div>

              {props.allProjects && props.allProjects.results?.length === 0 ? (
                <div className="flex justify-center mt-4">
                  <span className="text-gray-500">
                    {t("dashboard.pages.search_project.alert_not_found")}
                  </span>
                </div>
              ) : (
                <div>
                  <AllProjectsData
                    data={props.allProjects}
                    handlePageClick={handlePageClick}
                    limit={15}
                    selected={selected}
                  />
                </div>
              )}
            </>
          </div>
        ) : (
          <div className="flex justify-center text-gray-500 text-[15px]">
            <span>{t("dashboard.pages.search_project.alert_description")}</span>
          </div>
        )}
      </main>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.projectReducer.loading,
    allProjects: state.projectReducer.allProjects,
    profileData: state.profileReducer.profileData,
    allExperience: state.profileReducer.allExperience,
    allEducations: state.profileReducer.allEducations,
    allCourses: state.profileReducer.allCourses,
    allAbout: state.profileReducer.allAbout,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetAllPorjects: (value) => dispatch(getAllPorjects(value)),
    onGetProfile: (value) => dispatch(getProfile(value)),
    onGetAllExperience: (value) => dispatch(getAllExperience(value)),
    onGetAllEducations: (value) => dispatch(getAllEducations(value)),
    onGetAllCourses: (value) => dispatch(getAllCourses(value)),
    onGetAllAbout: (value) => dispatch(getAllAbout(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProjects);
