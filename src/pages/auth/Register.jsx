import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
// react-router-dom
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// react-icons
import { IoEye } from 'react-icons/io5';
import { IoMdEyeOff } from 'react-icons/io';
import { MdClose } from 'react-icons/md';
import { getToast, getToastError, getToastWarn } from '../../utils/options';
import { axiosInstances } from '../../config/config';
import { onLogin } from '../../redux/reducers/rootReducer';
// import { encode } from 'string-encode-decode';
// import { register } from '../../services/auth';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { t } = useTranslation();
  const {state} = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = async (data) => {
    const obj = {
      first_name: data.name,
      last_name: data.lastname,
      email: data.email,
      password: data.password,
      confirm_password: data.repeat_password,
    };

    if (!(data.password?.length < 8)) {
      if (data.password === data.repeat_password) {
        try {
          const res = await axiosInstances.post("/register/", obj);
          if (res.status === 201 || res.status == 200 || res.status == 204) {
            if (res.data?.access) {
              getToast(t("toastMessage.registerPage.your_information_saved"));
              navigate("/login");
            }
          } else getToastWarn(
            res.data?.message || t("toastMessage.registerPage.error_occured")
          );
        } catch (error) {
          // if (Array.isArray(error?.response?.data)) {
          let keys = Object.keys(error?.response?.data);
          if (Object.values(error?.response?.data)?.length > 0) {
            Object.values(error?.response?.data).forEach((item, index) => {
              if (Array.isArray(item) && item?.length > 0) {
                item.map(el => {
                  getToastError(keys[index] + ": " + el);
                })
              } else {
                getToastError(keys[index] + ": " + item);
              }
            })
          }
          // } else getToastWarn(t("toastMessage.registerPage.server_problem"));
        }
      } else getToastWarn(t("toastMessage.registerPage.password_incorrect"));
    } else getToastWarn(t("toastMessage.registerPage.password_validation"));
  };

  return (
    <div className='flex items-center justify-center h-[100vh] bg-black m-auto relative'>
      <div className='flex flex-col w-full md:max-w-xl'>
        <h1 className='lg:text-4xl text-xl text-text-main_green font-gunterz text-center'>
          {t("register.title")}
        </h1>
        <form onSubmit={handleSubmit(data => submitHandler(data))} className='flex text-white flex-col px-6 pt-6 w-full '>
          <input
            className={`bg-input_color outline-none border w-full py-4 px-4 rounded mb-4 ${errors.name ? "border-red-700" : "border-input_color"}`}
            type='text'
            placeholder={t("register.firstname_input_placeholder")}
            defaultValue={state && state.hasOwnProperty("name") ? state?.name : ""}
            {...register('name', { required: true, maxLength: 50 })}
          />
          <input
            className={`bg-input_color outline-none border w-full py-4 px-4 rounded mb-4 ${errors.lastname ? "border-red-700" : "border-input_color"}`}
            type='text'
            placeholder={t("register.lastname_input_placeholder")}
            {...register('lastname', { required: true, maxLength: 50 })}
          />
          <input
            className={`bg-input_color outline-none border w-full py-4 px-4 rounded mb-4 ${errors.email ? "border-red-700" : "border-input_color"}`}
            type='email'
            placeholder={t("register.email_input_placeholder")}
            defaultValue={state && state.hasOwnProperty("email") ? state?.email : ""}
            {...register('email', { required: true })}
          />
          <div className='flex items-center rounded-md bg-input_color relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              className={`bg-input_color outline-none border w-full py-4 px-4 pr-8 rounded ${errors.password ? "border-red-700" : "border-input_color"}`}
              placeholder={t("register.password_input_placeholder")}
              {...register('password', {
                required: true
              })}
            />
            <button
              type='button'
              onClick={togglePasswordVisibility}
              className='text-gray-300 outline-none focus:outline-none absolute top-0 bottom-0 right-2'
            >
              {showPassword ? <IoEye /> : <IoMdEyeOff />}
            </button>
          </div>
          <div className='flex mt-4 items-center rounded-md bg-input_color relative'>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              className={`bg-input_color outline-none border w-full py-4 px-4 pr-8 rounded ${errors.repeat_password ? "border-red-700" : "border-input_color"}`}
              placeholder={t("register.password_repeat_input_placeholder")}
              {...register('repeat_password', { required: true })}
            />
            <button
              type='button'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className='ml-2 text-gray-300 outline-none focus:outline-none absolute top-0 bottom-0 right-2'
            >
              {showConfirmPassword ? <IoEye /> : <IoMdEyeOff />}
            </button>
          </div>
          <button
            type='submit'
            className='bg-text-main_green mt-4 p-3 rounded-md font-gilroy-bold text-white'
          >
            {t("register.button_text")}
          </button>
          <Link to={'/login'}>
            <h1 className='text-white text-center my-4 font-gilroy-bold text-sm'>
              {t("register.have_account")}{" "}
              <span className="text-text-main_green">
                {t("register.sign_in")}
              </span>
            </h1>
          </Link>
        </form>
      </div>

      <div className='absolute top-4 right-4'>
        <Link to="/">
          <MdClose className='text-[20px] text-white cursor-pointer' />
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.rootReducer.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoginHandler: (value) => dispatch(onLogin(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);