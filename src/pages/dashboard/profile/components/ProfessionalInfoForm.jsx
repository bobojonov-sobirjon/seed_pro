import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
let levelData = [
    { value: 1, name: "Middle" },
    { value: 2, name: "Junior" },
    { value: 3, name: "Senior" },
];

let language_level_data = [
    { value: 1, name: "B1" },
    { value: 2, name: "B2" },
];

function ProfessionalInfoForm({ handleProfessionalInformation, register, errors, handleSubmit, language_level_ref, level_ref, loading }) {
    const { t } = useTranslation();

    return (
        <form onSubmit={handleSubmit(data => handleProfessionalInformation(data))} className='forms'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                    <span className='block mb-2 text-[13px] lg:text-sm font-bold text-custom-gray'>
                        {t("dashboard.profile.professional_information.position_input_label")}{" "} <span className='text-red-700'>*</span>
                    </span>
                    <input
                        type='text'
                        name='position_professional'
                        className={`bg-gray-50 text-gray-900 text-sm rounded-lg outline-none border focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 ${errors.position ? "border-red-700" : "border-gray-50"}`}
                        placeholder={t("dashboard.profile.professional_information.position_input_placeholder")}
                        {...register('position', { required: true, maxLength: 255 })}
                    />
                </div>
                <div>
                    <span className='block mb-2 text-[13px] lg:text-sm font-bold text-custom-gray'>
                        {t("dashboard.profile.professional_information.level_select_label")}{" "} <span className='text-red-700'>*</span>
                    </span>
                    <select
                        name='level_professional'
                        className='bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 outline-none focus:border-blue-500 block w-full p-3.5 h-[47px]'
                        ref={level_ref}
                    >
                        {levelData?.length > 0 && levelData.map((elem, ind) => (
                            <option key={elem.value} value={elem.value}>
                                {t(
                                    `dashboard.profile.professional_information.items.${ind}.title`
                                )}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <span className='block mb-2 text-[13px] lg:text-sm font-bold text-custom-gray'>
                        {t(
                            "dashboard.profile.professional_information.language_input_label"
                        )}{" "} <span className='text-red-700'>*</span>
                    </span>
                    <input
                        name='language_professional'
                        type='text'
                        className={`bg-gray-50 text-gray-900 text-sm rounded-lg outline-none border focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 ${errors.language ? "border-red-700" : "border-gray-50"}`}
                        placeholder={t(
                            "dashboard.profile.professional_information.language_input_plaholder"
                        )}
                        {...register('language', { required: true, maxLength: 255 })}
                    />
                </div>
                <div>
                    <span className='block mb-2 text-[13px] lg:text-sm font-bold text-custom-gray'>
                        {t(
                            "dashboard.profile.professional_information.language_select_label"
                        )}{" "} <span className='text-red-700'>*</span>
                    </span>
                    <select
                        name='languageLevel_professional'
                        className='bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 outline-none focus:border-blue-500 block w-full p-3.5 h-[47px]'
                        ref={language_level_ref}
                    >
                        {language_level_data?.length > 0 && language_level_data.map(el => (
                            <option key={el.value} value={el.value}>{el.name}</option>
                        ))}
                    </select>
                </div>
                <div className='md:col-span-2'>
                    <span className='block mb-2 text-[13px] lg:text-sm font-bold text-custom-gray'>
                        {t("dashboard.profile.professional_information.skills_input_label")}{" "} <span className='text-red-700'>*</span>
                    </span>
                    <input
                        type='text'
                        name='skills_professional'
                        placeholder={t("dashboard.profile.professional_information.skills_input_placeholder")}
                        className={`bg-gray-50 text-gray-900 text-sm rounded-lg outline-none border focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 ${errors.skills ? "border-red-700" : "border-gray-50"}`}
                        {...register('skills', { required: true, maxLength: 255 })}
                    />
                </div>
            </div>

            <div className='grid grid-cols-2 lg:flex lg:items-center lg:justify-end gap-4 mt-2'>
                <button
                    type='button'
                    className='text-white col-span-1 bg-custom-gray border-1 border-custom-gray hover:border-gray-500 transition-all hover:bg-gray-500 hover:text-white font-gilroy-bold p-3 px-[35px] rounded text-[13px] focus:outline-none focus:shadow-outline'
                >
                    {t("dashboard.profile.professional_information.cancel_button_text")}
                </button>
                <button
                    type='submit'
                    className={`text-text-main_green border col-span-1 border-text-main_green transition-all hover:bg-main-green hover:text-white font-gilroy-bold py-3 px-[35px] rounded focus:outline-none text-[13px] focus:shadow-outline ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
                    disabled={loading}
                >
                    {t("dashboard.profile.professional_information.save_button_text")}
                </button>
            </div>
        </form>
    )
}

export default memo(ProfessionalInfoForm);