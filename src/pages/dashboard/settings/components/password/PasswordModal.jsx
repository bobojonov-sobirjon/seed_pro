import React, { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IoMdEyeOff } from 'react-icons/io';
import { IoEye } from 'react-icons/io5';
import { axiosInstances } from '../../../../../config/config';
import { errorHandler, getToast, getToastWarn } from '../../../../../utils/options';

function PasswordModal(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);

    // submit handler
    const submitHandler = async data => {
        if (data.password.trim()?.length > 0 && data.password2.trim()?.length > 0 && data.password3.trim()?.length > 0) {
            if (data.password2.trim()?.length > 7 && data.password3.trim()?.length > 7) {
                if (data.password2.trim() === data.password3.trim()) {
                    setLoading(true);
                    try {
                        const res = await axiosInstances.post("/password/change/", {
                            old_password: data.password,
                            new_password: data.password2,
                            confirm_password: data.password3,
                        });
                        if (res.status === 200 || res.status === 201) {
                            getToast(t("toastMessage.passwordModalPage.edit_password"));
                            props.closeModal();
                            setLoading(false);
                        } else {
                            getToastWarn(res.data || res.data?.message);
                            setLoading(false);
                        }
                    } catch (error) {
                        // console.log(error);
                        setLoading(false);
                        errorHandler(error);
                    }
                } else getToastWarn(t("toastMessage.passwordModalPage.new_password"));
            } else getToastWarn(t("toastMessage.passwordModalPage.validation"));
        }
    }


    return (
        <>
            <form onSubmit={handleSubmit(data => submitHandler(data))}>
                <div className="sm:text-left text-txt_color-slate p-4 md:p-6 lg:p-14 flex flex-col gap-8">
                    <div className="text-sm sm:text-base font-normal flex flex-col gap-2">
                        <h3 className='font-thin font-gunterz lg:text-left text-center'>
                            {t("dashboard.settings.password_modal.title")}
                        </h3>
                        <span className='text-[#a7a5a5]'>{t("dashboard.settings.password_modal.description")}</span>
                    </div>

                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col rounded-md relative'>
                            <span className='block font-gilroy text-sm font-bold mb-2'>
                                {t("dashboard.settings.password_modal.current_password_input")}
                            </span>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className={`bg-[#fafafa] outline-none border w-full py-4 px-4 pr-8 rounded ${errors.password ? "border-red-700" : "border-[#fafafa]"}`}
                                placeholder={t(
                                    "dashboard.settings.password_modal.current_password_input"
                                )}
                                {...register('password', { required: true })}
                            />
                            <button
                                type='button'
                                onClick={() => setShowPassword(!showPassword)}
                                className='text-gray-300 outline-none focus:outline-none absolute top-7 bottom-0 right-2'
                            >
                                {showPassword ? <IoEye className='text-gray-600' size={20} /> : <IoMdEyeOff className='text-gray-600' size={20} />}
                            </button>
                        </div>
                        <div className='flex flex-col rounded-md relative'>
                            <span className='block font-gilroy text-sm font-bold mb-2'>
                                {t("dashboard.settings.password_modal.new_password_input")}
                            </span>
                            <input
                                type={showPassword2 ? 'text' : 'password'}
                                className={`bg-[#fafafa] outline-none border w-full py-4 px-4 pr-8 rounded ${errors.password2 ? "border-red-700" : "border-[#fafafa]"}`}
                                placeholder={t(
                                    "dashboard.settings.password_modal.new_password_input"
                                )}
                                {...register('password2', { required: true })}
                            />
                            <button
                                type='button'
                                onClick={() => setShowPassword2(!showPassword2)}
                                className='text-gray-300 outline-none focus:outline-none absolute top-7 bottom-0 right-2'
                            >
                                {showPassword2 ? <IoEye className='text-gray-600' size={20} /> : <IoMdEyeOff className='text-gray-600' size={20} />}
                            </button>
                        </div>
                        <div className='flex flex-col rounded-md relative'>
                            <span className='block font-gilroy text-sm font-bold mb-2'>
                                {t(
                                    "dashboard.settings.password_modal.repeat_new_password_input"
                                )}
                            </span>
                            <input
                                type={showPassword3 ? 'text' : 'password'}
                                className={`bg-[#fafafa] outline-none border w-full py-4 px-4 pr-8 rounded ${errors.password3 ? "border-red-700" : "border-[#fafafa]"}`}
                                placeholder={t(
                                    "dashboard.settings.password_modal.repeat_new_password_input"
                                )}
                                {...register('password3', { required: true })}
                            />
                            <button
                                type='button'
                                onClick={() => setShowPassword3(!showPassword3)}
                                className='text-gray-300 outline-none focus:outline-none absolute top-7 bottom-0 right-2'
                            >
                                {showPassword3 ? <IoEye className='text-gray-600' size={20} /> : <IoMdEyeOff className='text-gray-600' size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 lg:flex lg:items-center lg:justify-center gap-4 mt-2'>
                        <button
                            type='button'
                            className='text-white col-span-1 bg-custom-gray transition-all hover:bg-gray-700 hover:text-white font-gilroy-bold p-5 px-10 rounded focus:outline-none focus:shadow-outline w-full lg:w-[40%]'
                            onClick={props.closeModal}
                        >
                            {t("dashboard.settings.password_modal.cancel_button_text")}
                        </button>
                        <button
                            type='submit'
                            className={`text-white col-span-1 transition-all bg-main-green font-gilroy font-bold py-5 px-10 rounded focus:outline-none focus:shadow-outline w-full lg:w-[60%] ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
                            disabled={loading}
                        >
                            {t("dashboard.settings.password_modal.save_button_text")}
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default memo(PasswordModal);