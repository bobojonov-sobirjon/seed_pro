// react core
import { useState } from 'react';
// react-router-dom
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import Cookies from 'universal-cookie';
import { useTranslation } from 'react-i18next';

// react-icons
import { IoEye } from 'react-icons/io5';
import { IoMdEyeOff } from 'react-icons/io';
import { axiosInstances } from '../../config/config';
import { getToastError, getToastWarn } from '../../utils/options';
import { isLoading, onLogin } from '../../redux/reducers/rootReducer';
import { MdClose } from 'react-icons/md';

const Login = (props) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const cookies = new Cookies();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // submit handler
  const submitHandler = async data => {
    if (data.email.trim().length > 0 && data.password.trim().length > 0) {
      props.onLoading(true);
      try {
        const res = await axiosInstances.post("/login/", {
          email: data.email,
          password: data.password
        })
        // console.log(res);
        if (res.status === 201 || res.status === 200) {
          if (res.data?.access) {
            cookies.set('user', res.data.access, { path: '/', secure: true, sameSite: "none", });

            props.onLoginHandler(res.data.access);
            // window.location.replace("/admin/pages");
            window.location.replace("/role");
          }
          props.onLoading(false);
        } else {
          getToastWarn(t("toastMessage.loginPage.login_password_incorrect"));
          props.onLoading(false);
        }
      } catch (error) {
        let keys = Object.keys(error?.response?.data);
        if (Object.values(error?.response?.data)?.length > 0) {
          Object.values(error?.response?.data).forEach((item, index) => {
            if (item?.length > 0 && Array.isArray(item)) {
              item.map(el => {
                getToastError(
                  t("toastMessage.loginPage.login_password_incorrect")
                );
              })
            } else {
              getToastError(
                t("toastMessage.loginPage.login_password_incorrect")
              );
            }
          })
        }
        props.onLoading(false);
      }
    } else getToastWarn(t("toastMessage.loginPage.login_password_incorrect_more"));
  };

  return (
    <div className='flex items-center justify-center h-[100vh] bg-black m-auto relative'>
      <div className='flex flex-col w-full md:max-w-xl'>
        <h1 className='lg:text-4xl text-xl text-text-main_green font-gunterz text-center'>
          {t("login.title")}
        </h1>
        <form onSubmit={handleSubmit(data => submitHandler(data))} className='flex text-white flex-col px-6 pt-6 w-full'>
          <input
            className={`bg-input_color outline-none border w-full py-4 px-4 rounded mb-4 ${errors.email ? "border-red-700" : "border-input_color"}`}
            type='email'
            placeholder={t("login.email_input_placeholder")}
            {...register('email', { required: true })}
          />
          <div className='flex items-center rounded-md bg-input_color relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              className={`bg-input_color outline-none border w-full py-4 px-4 pr-8 rounded ${errors.password ? "border-red-700" : "border-input_color"}`}
              placeholder={t("login.password_input_placeholder")}
              {...register('password', { required: true })}
            />
            <button
              type='button'
              onClick={togglePasswordVisibility}
              className='ml-2 text-gray-300 outline-none focus:outline-none absolute top-0 bottom-0 right-2'
            >
              {showPassword ? <IoEye /> : <IoMdEyeOff />}
            </button>
          </div>
          <button
            type='submit'
            className={`bg-text-main_green mt-4 p-3 rounded-md font-gilroy-bold text-white flex items-center justify-center gap-2 ${props.loading ? "cursor-not-allowed" : "cursor-pointer"}`}
            disabled={props.loading}
          >
            {props.loading && (
              <div className="loadingg"></div>
            )}
            {t("login.button_text")}
          </button>
          <div className='flex text-white font-gilroy-bold text-center items-center justify-center my-4 gap-6'>
            <Link to={'/forgot-password'} className='text-[13px] lg:text-[14px]'>
              {t("login.forgot_password")}
            </Link>
            <div className='w-[1px] h-[22px] bg-white'></div>
            <Link to={'/register'} className='text-[13px] lg:text-[14px]'>
              {t("login.register")}
            </Link>
          </div>
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
    loading: state.rootReducer.loading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoginHandler: (value) => dispatch(onLogin(value)),
    onLoading: value => dispatch(isLoading(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
