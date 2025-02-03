import React, { memo, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FaUserCircle } from 'react-icons/fa';
import { BiCamera } from 'react-icons/bi';
import { getToast, getToastError } from '../../../../utils/options';
import { axiosInstances } from '../../../../config/config';

function Self(props) {
    const { t } = useTranslation();
    const { profileData } = props;
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [sex, setSex] = useState(profileData.hasOwnProperty("sex") ? profileData?.sex : "");
    const [file, setFile] = useState(profileData.hasOwnProperty("avatar") ? profileData?.avatar : null);
    const [loading, setLoading] = useState(false);
    const date_birthday_ref = useRef();

    useEffect(() => {
        if (profileData.hasOwnProperty('id')) {
            setFile(profileData?.avatar);
            setSex(profileData?.sex);
            setValue("firstname", profileData?.first_name);
            setValue("lastname", profileData?.last_name);
            setValue("country", profileData?.counrty);
            setValue("city", profileData?.city);
        }
    }, [props.profileData]);

    // select change
    const handleInputChange = (e) => {
        setSex(e.target.value);
    };

    // update profile
    const handleUpdateProfile = async data => {
        let obj = {
            active: profileData.active,
            email: profileData.email,
            id: profileData.id,
            phone: profileData.phone,
            username: profileData.username,
            first_name: data.firstname,
            last_name: data.lastname,
            counrty: data.country,
            city: data.city,
            sex,
            birth_date: date_birthday_ref.current?.value,
        };
        console.log(obj);
        if (typeof file !== "string") {
            obj.avatar = file;
        }
        setLoading(true);
        try {
            const res = await axiosInstances.put("/profile/", obj, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (res.status === 201 || res.status === 200) {
                getToast(t("toastMessage.selfPage.edit_success"));
                props.getData();
                setLoading(false);
            }
        } catch (error) {
            // console.log(error);
            setLoading(false);
            getToastError(error?.message);
        }
        // if (file) {
        // } else getToastWarn("Аватар не выбран.");
    };

    return (
        <>
            <div className='flex items-center space-x-4 p-2 lg:p-4 border-b'>
                <div className='relative w-[60px] h-[60px]'>
                    <div className='w-[60px] h-[60px]'>
                        {file ? (
                            typeof file === "string" ? (
                                <img src={file} alt="" className='w-full h-full rounded-full object-cover' />
                            ) : (
                                <img src={URL.createObjectURL(file)} alt="" className='w-full h-full rounded-full object-cover' />
                            )
                        ) : (
                            <FaUserCircle className='text-gray-400 w-full h-full' />
                        )}
                    </div>
                    <label htmlFor="selectFiles">
                        <BiCamera className='absolute bottom-0 right-0 text-gray-700 bg-white rounded-full p-0.5 cursor-pointer hover:bg-gray-200 transition-all' size={24} />
                        <input
                            type="file"
                            name="selectFiles_choose"
                            id="selectFiles"
                            className='hidden'
                            onClick={event => event.target.value = null}
                            onChange={event => setFile(event.target.files[0])}
                            autoComplete='true'
                        />
                    </label>
                </div>
                <div>
                    <div className='font-gunterz text-custom-gray text-md'>
                        {profileData?.first_name} {profileData?.last_name}
                    </div>
                    <div className='text-gray-600'>{profileData?.counrty}, г. {profileData?.city}</div>
                </div>
            </div>
            <form onSubmit={handleSubmit(data => handleUpdateProfile(data))} className='py-4 p-0 lg:p-4'>
                <div className='grid grid-cols-1 lg:grid-cols-2 -mx-3 mb-0 lg:mb-6'>
                    <div className='w-full px-3 mb-6 md:mb-0 col-span-1'>
                        <div className='mb-4'>
                            <span className='block mb-2 text-[13px] lg:text-sm font-bold text-custom-gray'>
                                {t(
                                    "dashboard.profile.main_information.firstname_input_placeholder"
                                )}{" "} <span className='text-red-700'>*</span>
                            </span>
                            <input
                                type='text'
                                name='firstName'
                                placeholder={t(
                                    "dashboard.profile.main_information.firstname_input_placeholder"
                                )}
                                className={`bg-gray-50 text-gray-900 text-sm rounded-lg outline-none border focus:ring-blue-500 focus:border-blue-500 block w-full p-3 ${errors.firstname ? "border-red-700" : "border-gray-50"}`}
                                {...register('firstname', { required: true, maxLength: 50 })}
                                autoComplete='true'
                            />
                        </div>
                    </div>
                    <div className='w-full px-3 mb-6 md:mb-0 col-span-1'>
                        <div className='mb-4'>
                            <span className='block mb-2 text-[13px] lg:text-sm font-bold text-custom-gray'>
                                {t(
                                    "dashboard.profile.main_information.lastname_input_placeholder"
                                )}{" "} <span className='text-red-700'>*</span>
                            </span>
                            <input
                                type='text'
                                name='lastName'
                                placeholder={t(
                                    "dashboard.profile.main_information.lastname_input_placeholder"
                                )}
                                className={`bg-gray-50 text-gray-900 text-sm rounded-lg outline-none border focus:ring-blue-500 focus:border-blue-500 block w-full p-3 ${errors.lastname ? "border-red-700" : "border-gray-50"}`}
                                {...register('lastname', { required: true, maxLength: 50 })}
                                autoComplete='true'
                            />
                        </div>
                    </div>
                    <div className='w-full px-3 mb-6 md:mb-0 col-span-1'>
                        <div className='mb-4'>
                            <span className='block mb-2 text-[13px] lg:text-sm font-bold text-custom-gray'>
                                {t(
                                    "dashboard.profile.main_information.gender_select_placeholder"
                                )}{" "} <span className='text-red-700'>*</span>
                            </span>
                            <select
                                name='gender_sex'
                                value={sex}
                                onChange={handleInputChange}
                                className='block appearance-none w-full bg-custom-light p-3 rounded leading-tight focus:outline-none focus:shadow-outline text-sm'
                            >
                                <option value="">
                                    {t("dashboard.profile.main_information.not_given_select")}
                                </option>
                                <option value="1">
                                    {t("dashboard.profile.main_information.man_select")}
                                </option>
                                <option value="2">
                                    {t("dashboard.profile.main_information.woman_select")}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className='w-full px-3 mb-6 md:mb-0 col-span-1'>
                        <div className='mb-4'>
                            <span className='block mb-2 text-[13px] lg:text-sm font-bold text-custom-gray'>
                                {t(
                                    "dashboard.profile.main_information.birthday_input_placeholder"
                                )}{" "} <span className='text-red-700'>*</span>
                            </span>
                            <div className='w-full'>
                                <input
                                    type="date"
                                    className="date_birtday relative block w-full appearance-none rounded-md p-2.5 bg-custom-light placeholder-gray-500 focus:z-10 focus:outline-none text-sm cursor-pointer"
                                    required
                                    ref={date_birthday_ref}
                                    defaultValue={profileData?.birth_date}
                                    autoComplete='true'
                                    onClick={event => event.target.showPicker()}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='w-full px-3 mb-6 md:mb-0 col-span-1'>
                        <div className='mb-4'>
                            <span className='block mb-2 text-[13px] lg:text-sm font-bold text-custom-gray'>
                                {t(
                                    "dashboard.profile.main_information.country_input_placeholder"
                                )}
                            </span>
                            <input
                                type='text'
                                name='country'
                                placeholder={t(
                                    "dashboard.profile.main_information.country_input_placeholder"
                                )}
                                className={`bg-custom-light rounded w-full p-3 text-gray-700 leading-tight border outline-none ${errors.country ? "border-red-700" : "border-custom-light"}`}
                                maxLength={250}
                                {...register('country', { required: true, maxLength: 50 })}
                                autoComplete='true'
                            />
                        </div>
                    </div>

                    <div className='w-full px-3 mb-6 md:mb-0 col-span-1'>
                        <div className='mb-4'>
                            <span className='block mb-2 text-[13px] lg:text-sm font-bold text-custom-gray'>
                                {t("dashboard.profile.main_information.city_input_placeholder")}
                            </span>
                            <input
                                type='text'
                                name='city'
                                placeholder={t(
                                    "dashboard.profile.main_information.city_input_placeholder"
                                )}
                                className={`bg-custom-light rounded w-full p-3 text-gray-700 leading-tight border outline-none ${errors.city ? "border-red-700" : "border-custom-light"}`}
                                maxLength={250}
                                {...register('city', { required: true, maxLength: 50 })}
                                autoComplete='true'
                            />
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-end'>
                    <button
                        type='submit'
                        className={`bg-text-main_green border text-white border-text-main_green w-full lg:w-auto hover:bg-main-green hover:text-white font-gilroy-bold py-3 px-6 rounded focus:outline-none text-[13px] focus:shadow-outline ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
                        disabled={loading}
                    >
                        {t("dashboard.profile.main_information.button_text")}
                    </button>
                </div>
            </form>
        </>
    )
}

export default memo(Self);