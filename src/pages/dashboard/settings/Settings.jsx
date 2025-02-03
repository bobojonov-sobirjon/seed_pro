import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from "universal-cookie";
import { useTranslation } from 'react-i18next';
import Email from './components/email/Email';
import PhoneNumber from './components/phoneNumber/PhoneNumber';
import Password from './components/password/Password';
import TimeFormat from './components/TimeFormat';
import { getProfile } from '../../../redux/reducers/profileReducer';
import DeleteModal from '../../../components/modal/DeleteModal';
import { onExit } from '../../../redux/reducers/rootReducer';
import { errorHandler, getToastWarn } from '../../../utils/options';
import { axiosInstances } from '../../../config/config';

const Settings = (props) => {
  const cookie = new Cookies();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // get profile
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    props.onGetProfile({ signal }); // get profile

    return () => controller.abort();
  }, []);

  const getData = () => {
    props.onGetProfile({}); // get profile
  }


  //  -----------------------------  delete element --------------------------------
  // open delete  modal
  const openDeleteModalHandler = useCallback(() => {
    setOpenDeleteModal(true);
  }, []);

  // close delete modal
  const closeDeleteModal = useCallback(() => {
    setOpenDeleteModal(false);
  }, []);

  // delete item
  const deleteItemHandler = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosInstances.delete("/profile/");
      if (res.status === 200 || res.status === 201) {
        props.onExitHandler(null);
        cookie.remove("user", { path: '/' });
        navigate("/");
      } else {
        getToastWarn(res.data || res.data?.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      errorHandler(error);
    }
  }, [openDeleteModal]);

  return (
    <>
      <div className='max-w-5xl mx-auto my-10'>
        <h1 className='font-gunterz text-custom-gray text-xl lg:text-2xl lg:text-left text-center'>
          {t("dashboard.settings.title")}
        </h1>
        <div className='max-w-4xl my-8 p-2 lg:p-6 bg-white shadow-lg rounded-lg flex flex-col gap-6'>
          {/* email */}
          <Email
            data={props.profileData}
            getData={getData}
          />

          {/* phone number */}
          <PhoneNumber
            data={props.profileData}
            getData={getData}
          />

          {/* password */}
          <Password
          />

          {/* time format */}
          <TimeFormat />

          <div className='flex justify-end items-center'>
            <button
              type="button"
              onClick={openDeleteModalHandler}
              className='text-white bg-custom-orange lg:w-auto w-full font-gilroy-bold text-sm px-[40px] py-4 rounded focus:outline-none focus:shadow-outline text-[13px]'
            >
              {t("dashboard.settings.button_text")}
            </button>
          </div>
        </div>
      </div>

      {/* delete element */}
      {openDeleteModal && (
        <DeleteModal
          closeModal={closeDeleteModal}
          open={openDeleteModal}
          deleteItemHandler={deleteItemHandler}
          account={true}
        />
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    profileData: state.profileReducer.profileData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetProfile: value => dispatch(getProfile(value)),
    onExitHandler: (value) => dispatch(onExit(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
