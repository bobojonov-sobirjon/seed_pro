import React, { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import speakerImage from '../../../assets/images/speaker-girl.png';
import { getToast, getToastError, getToastWarn } from '../../../utils/options';
import { axiosInstances } from '../../../config/config';
import Loading from '../../../components/Loading';

function Speaker() {
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);

    // submit
    const submitHandler = async data => {
        setLoading(true);
        try {
            const res = await axiosInstances.post("/email/spiker/send/", data);
            if (res.status == 200 || res.status == 201 || res.status == 204) {
                getToast("Ваш запрос успешно отправлен.");
                setLoading(false);
                reset();
            } else {
                getToastWarn(res?.message || res?.data?.message);
                setLoading(false);
            }
        } catch (error) {
            getToastError(error?.message);
            setLoading(false);
        }
    }

    return (
        // {/* speaker section */ }
        <a name="contact">
            <div className='bg-white p-0 lg:p-8 py-0 mb-8 mt-4 lg:mt-24' >
                <div className='container mx-auto px-4 py-8 lg:py-12'>
                    <div>
                        <div className='flex flex-col md:flex-row items-center relative shadow-lg rounded-lg px-6'>
                            <div className='md:w-2/3 w-full p-0 lg:p-4 pt-0 pb-10 lg:pb-32'>
                                <span className='text-custom-gray text-[20px] lg:text-[30px] font-gunterz font-medium uppercase text-center lg:text-left'>
                                    {t("home.speaker.title_one")}{" "}
                                    <span className="text-text-main_green">
                                        {t("home.speaker.title_two")}
                                    </span>
                                </span>
                                <form onSubmit={handleSubmit(data => submitHandler(data))} className='grid mt-4 grid-cols-1 md:grid-cols-3 gap-4 px-4 pl-0'>
                                    <input
                                        className={`bg-transparent rounded-md outline-none border border-gray-300 p-2 ${errors.name ? "border-red-700" : "border-gray-300"}`}
                                        placeholder={t("home.speaker.name_input_placeholder")}
                                        type='text'
                                        {...register('name', { required: true })}
                                    />
                                    <input
                                        className={`bg-transparent rounded-md outline-none border border-gray-300 p-2 ${errors.email ? "border-red-700" : "border-gray-300"}`}
                                        placeholder={t("home.speaker.email_input_placeholder")}
                                        type='email'
                                        {...register('email', { required: true })}
                                    />
                                    <button
                                        type="submit"
                                        className='bg-text-main_green text-white rounded-md p-3 md:p-6 font-gilroy-bold flex items-center justify-center gap-2'
                                        style={{ cursor: loading ? "not-allowed" : "pointer" }}
                                        disabled={loading}
                                    >
                                        {loading && (
                                            <Loading border="border-white" />
                                        )}
                                        {t("home.speaker.button_text")}
                                    </button>
                                </form>
                                <p className='text-[#939393] font-gilroy mt-6 px-4 pl-0 text-[14px] text-center lg:text-left lg:mt-4 font-medium'>
                                    {t("home.speaker.form_description")}
                                </p>
                            </div>

                            <div className='lg:mt-6 lg:mb-10 lg:absolute -bottom-10 right-0 z-10'>
                                <div className='relative'>
                                    <img src={speakerImage} alt='' className='w-full' />
                                    <div className='absolute bottom-0 left-0 lg:left-10 right-0 backdrop-blur-lg py-[24px] rounded-[5px] text-center w-[90%] lg:w-[70%] m-auto' style={{ background: "rgba(169, 169, 169, 0.3)" }}>
                                        <span className='font-bold text-white text-[14px]'>
                                            {t("home.speaker.image_title")}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    )
}

export default memo(Speaker);