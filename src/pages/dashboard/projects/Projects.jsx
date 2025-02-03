import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Typography } from "@material-tailwind/react";
import ProjectCard from './components/ProjectCard';
import { deleteOneSelfProject, getSelfAllProjects } from '../../../redux/reducers/projectReducer';
import DeleteModal from '../../../components/modal/DeleteModal';
import { getProfile } from '../../../redux/reducers/profileReducer';

const Projects = (props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [openDeleteModal, setOpenDeleteModal] = useState({ open: false, data: {} });

  // get profile
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    props.onGetSelfAllProjects({ signal }); // get profile
    props.onGetProfile({ signal });

    return () => controller.abort();
  }, []);

  //  -----------------------------  delete element --------------------------------
  // open delete  modal
  const openDeleteModalHandler = useCallback(item => {
    setOpenDeleteModal({ open: true, data: item });
  }, []);

  // close delete modal
  const closeDeleteModal = useCallback(() => {
    setOpenDeleteModal({ open: false, data: {} });
  }, []);

  // delete item
  const deleteItemHandler = useCallback(() => {
    props.onDeleteOneSelfProject({ item: openDeleteModal.data });
    closeDeleteModal();
  }, [openDeleteModal]);


  //   -----------------------------  update element --------------------------------
  const openUpdateModalHandler = item => {
    navigate("/admin/update-project", { state: item });
  };

  console.log(props.allSelfProjects)
  return (
    <>
      {props.profileData?.active && (
        <>
          <div className='max-w-5xl mx-auto my-10'>
            {props.loading ? (
              <div className="max-w-full animate-pulse">
                <Typography
                  as="div"
                  variant="h1"
                  className="mb-6 h-8 w-full rounded-lg bg-gray-300"
                >
                  &nbsp;
                </Typography>
                <Typography
                  as="div"
                  variant="h1"
                  className="mb-6 h-[155px] w-full rounded-xl bg-gray-300"
                >
                  &nbsp;
                </Typography>
                <Typography
                  as="div"
                  variant="h1"
                  className="mb-4 h-[155px] w-full rounded-xl bg-gray-300"
                >
                  &nbsp;
                </Typography>
              </div>
            ) : (
              <div>
                {props.allSelfProjects?.length === 0 ? (
                  <div>
                    <h2 className='text-2xl text-custom-gray font-gunterz mb-5'>
                      {t("dashboard.myProjects.current.title")}
                    </h2>
                    <p className='font-gilroy-bold text-sm text-custom-gray'>
                      {t("dashboard.myProjects.current.description")}{" "}
                      <Link to="/admin/all-projects">
                        <span className='text-text-main_green cursor-pointer'>
                          {t("dashboard.myProjects.current.sub_text_one")}
                        </span>
                        {t("dashboard.myProjects.current.sub_text_two")} <br />{" "}
                      </Link>
                      {t("dashboard.myProjects.current.sub_text_three")}
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className='mb-6'>
                      <span className='font-gunterz text-[22px] text-custom-gray'>
                        {t("dashboard.myProjects.current.my_project")}
                      </span>
                    </div>
                    <ProjectCard
                      data={props.allSelfProjects}
                      openDeleteModalHandler={openDeleteModalHandler}
                      openUpdateModalHandler={openUpdateModalHandler}
                    />
                  </div>
                )}
              </div>
            )}
            {props.profileData?.active && (
              <div className='flex justify-start items-start '>
                <Link to={'/admin/create-project'}>
                  <button
                    className='bg-custom-gray font-gilroy-bold hover:bg-gray-600 transition-all text-white py-4 px-8 text-sm rounded focus:outline-none focus:shadow-outline mt-4'
                  >
                    {t("dashboard.myProjects.current.button_text")}
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* // delete element */}
          {openDeleteModal.open && (
            <DeleteModal
              closeModal={closeDeleteModal}
              open={openDeleteModal.open}
              deleteItemHandler={deleteItemHandler}
            />
          )}
        </>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.projectReducer.loading,
    allSelfProjects: state.projectReducer.allSelfProjects,
    profileData: state.profileReducer.profileData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetSelfAllProjects: value => dispatch(getSelfAllProjects(value)),
    onDeleteOneSelfProject: value => dispatch(deleteOneSelfProject(value)),
    onGetProfile: value => dispatch(getProfile(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
