import React, { memo, useState } from 'react'
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { errorHandler, getToast } from '../../../../utils/options';
import { deleteOneProfessionalInfo } from '../../../../redux/reducers/profileReducer';
import { axiosInstances } from '../../../../config/config';
let levelData = [
    { value: 1, name: "Middle" },
    { value: 2, name: "Junior" },
    { value: 3, name: "Senior" },
];

let language_level_data = [
    { value: 1, name: "B1" },
    { value: 2, name: "B2" },
]

function ProfessionalInfoData(props) {
    const { item, index, getData } = props;
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);

    // professional information
    const handleProfessionalInformationData = async index => {
        let forms = document.querySelectorAll('.forms')[index];

        const obj = {
            career_objective: forms.querySelector('.position').value,
            level: forms.querySelector('.level').value,
            laguage: forms.querySelector('.language').value,
            laguage_level: forms.querySelector('.languageLevel').value,
            skills: forms.querySelector('.skills').value,
        };

        setLoading(true);
        try {
            const res = await axiosInstances.put(`/professional/information/${item.id}/`, obj);
            if (res.status) {
                getToast(t("toastMessage.professionalInfoDataPage.edit_success"));
                setLoading(false);
                getData();
            }
        } catch (error) {
            // console.log(error);
            setLoading(false);
            errorHandler(error);
        }
    };

    // delete item
    const deleteItem = value => {
        props.onDeleteOneProfessionalInfo({ item: value });
        getData();
    }

    return (
        <div className='forms w-full'>
            <div className='grid gap-6 md:grid-cols-2'>
                <div>
                    <span className='block mb-2 text-[13px] lg:text-sm font-bold text-custom-gray'>
                        {t(
                            "extraComponents.professionalInfoData.desired_position_input_label"
                        )}
                    </span>
                    <input
                        type='text'
                        name='position_professional_update'
                        className='bg-gray-50 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 position'
                        placeholder={t(
                            "extraComponents.professionalInfoData.desired_position_input_placeholder"
                        )}
                        defaultValue={item?.career_objective}
                        required
                    />
                </div>
                <div>
                    <span className='block mb-2 text-[13px] lg:text-sm font-bold text-custom-gray'>
                        {t("extraComponents.professionalInfoData.level")}
                    </span>
                    <select
                        name='level_professional_update'
                        className='bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 outline-none focus:border-blue-500 block w-full p-3.5 h-[47px] level'
                    >
                        {levelData?.length > 0 && levelData.map(elem => (
                            <option key={elem.value} value={elem.value} selected={elem.name === item.level}>{elem.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <span className='block mb-2 text-[13px] lg:text-sm font-bold text-custom-gray'>
                        {t(
                            "extraComponents.professionalInfoData.foreign_language_input_label"
                        )}
                    </span>
                    <input
                        name='language_professional_update'
                        type='text'
                        className='text-gray-900 bg-custom-light text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 language'
                        placeholder={t(
                            "extraComponents.professionalInfoData.foreign_language_input_placeholder"
                        )}
                        defaultValue={item?.laguage}
                        required
                    />
                </div>
                <div>
                    <span className='block mb-2 text-[13px] lg:text-sm font-bold text-custom-gray'>
                        {t("extraComponents.professionalInfoData.lang_level")}
                    </span>
                    <select
                        name='languageLevel_professional_update'
                        className='bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 outline-none focus:border-blue-500 block w-full p-3.5 h-[47px] languageLevel'
                    >
                        {language_level_data?.length > 0 && language_level_data.map(el => (
                            <option key={el.value} value={el.value} selected={el.name === item.laguage_level}>{el.name}</option>
                        ))}
                    </select>
                </div>
                <div className='md:col-span-2'>
                    <span className='block mb-2 text-[13px] lg:text-sm font-bold text-custom-gray'>
                        {t("extraComponents.professionalInfoData.skills_input_label")}
                    </span>
                    <input
                        type='text'
                        name='skills_professional_update'
                        placeholder={t(
                            "extraComponents.professionalInfoData.skills_input_placeholder"
                        )}
                        className='bg-custom-light text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 skills'
                        defaultValue={item?.skills}
                        required
                    />
                </div>
            </div>
            <div className='grid grid-cols-2 lg:flex lg:items-center lg:justify-end gap-4 mt-2 lg:mb-0 mb-2'>
                <button
                    type='button'
                    className='text-white col-span-1 bg-custom-gray border-1 border-custom-gray hover:border-gray-500 transition-all hover:bg-gray-500 hover:text-white font-gilroy-bold p-3 px-[35px] text-[13px] rounded focus:outline-none focus:shadow-outline'
                    onClick={() => deleteItem(item)}
                >
                    {t("extraComponents.professionalInfoData.delete_button_text")}
                </button>
                <button
                    type='button'
                    className={`text-text-main_green text-[13px] border col-span-1 border-text-main_green transition-all hover:bg-main-green hover:text-white font-gilroy-bold py-3 px-[35px] rounded focus:outline-none focus:shadow-outline ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
                    disabled={loading}
                    onClick={() => handleProfessionalInformationData(index)}
                >
                    {t("extraComponents.professionalInfoData.save_button_text")}
                </button>
            </div>

            {/* <div className='grid grid-cols-2 lg:flex lg:items-center lg:justify-end gap-4 mt-1'>
                <button
                    type='button'
                    className='text-white col-span-1 bg-custom-gray border-1 border-custom-gray hover:border-gray-500 transition-all hover:bg-gray-500 hover:text-white font-gilroy-bold p-3 px-8 rounded focus:outline-none focus:shadow-outline'
                    onClick={() => deleteItem(item)}
                >
                    Удалить
                </button>
                <button
                    type='button'
                    className={`text-text-main_green col-span-1 border border-text-main_green hover:bg-main-green hover:text-white font-gilroy font-bold py-3 px-6 rounded focus:outline-none  focus:shadow-outline ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
                    disabled={loading}
                    onClick={() => handleProfessionalInformationData(index)}
                >
                    Сохранить
                </button>
            </div> */}
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onDeleteOneProfessionalInfo: value => dispatch(deleteOneProfessionalInfo(value)),
    }
}

export default connect(null, mapDispatchToProps)(memo(ProfessionalInfoData));