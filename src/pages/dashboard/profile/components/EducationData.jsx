import React, { memo, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { deleteOneEducation } from '../../../../redux/reducers/profileReducer';
import { axiosInstances } from '../../../../config/config';
import { errorHandler, getToast } from '../../../../utils/options';

function EducationData(props) {
    const { item, index, getData } = props;
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const start_date_ref = useRef();
    const end_date_ref = useRef();

    // professional information
    const handleExperienceData = async index => {
        let forms = document.querySelectorAll('.forms_educations')[index];

        const obj = {
            speciality: forms.querySelector('.specialty').value,
            institution: forms.querySelector('.institution').value,
            start_date: start_date_ref.current?.value,
            end_date: end_date_ref.current?.value,
        };
        // console.log(obj);
        setLoading(true);
        try {
            const res = await axiosInstances.put(`/education/${item.id}/`, obj);
            if (res.status) {
                getToast(t("toastMessage.educationDataPage.edit_success"));
                setLoading(false);
                getData();
            }
        } catch (error) {
            setLoading(false);
            errorHandler(error);
        }
    };

    // delete item
    const deleteItem = value => {
        props.onDeleteOneEducation({ item: value });
        getData();
    }

    return (
        <div className='forms_educations'>
            <div className='grid grid-cols-1 gap-6 mb-6'>
                <div>
                    <span className='block mb-2 text-[13px] lg:text-sm font-bold text-custom-gray'>
                        {t("extraComponents.educationData.speciality_input_label")}
                    </span>
                    <input
                        className='bg-custom-light appearance-none rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline specialty'
                        name='specialty_education_update'
                        type='text'
                        placeholder={t(
                            "extraComponents.educationData.speciality_input_placeholder"
                        )}
                        defaultValue={item?.speciality}
                    />
                </div>

                <div>
                    <span className='block mb-2 text-[13px] lg:text-sm font-bold text-custom-gray'>
                        {t("extraComponents.educationData.edu_institution_label")}
                    </span>
                    <input
                        className='bg-custom-light appearance-none rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline institution'
                        name='institution_education_update'
                        type='text'
                        placeholder={t(
                            "extraComponents.educationData.edu_institution_input_placeholder"
                        )}
                        defaultValue={item?.institution}
                    />
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                    <span className='block mb-2 text-[13px] lg:text-sm font-bold text-custom-gray'>
                        {t("extraComponents.educationData.start_training_time_label")}
                    </span>
                    <input
                        type="date"
                        name="start_date_education_update"
                        className="relative block w-full appearance-none rounded-md p-2.5 bg-custom-light placeholder-gray-500 focus:z-10 focus:outline-none text-sm cursor-pointer"
                        ref={start_date_ref}
                        required
                        defaultValue={item?.start_date}
                        onClick={event => event.target.showPicker()}
                    />
                </div>

                <div>
                    <span className='block mb-2 text-[13px] lg:text-sm font-bold text-custom-gray'>
                        {t("extraComponents.educationData.finish_training_time_label")}
                    </span>
                    <input
                        type="date"
                        name="end_date_education_update"
                        className="relative block w-full appearance-none rounded-md p-2.5 bg-custom-light placeholder-gray-500 focus:z-10 focus:outline-none text-sm cursor-pointer"
                        ref={end_date_ref}
                        required
                        defaultValue={item?.end_date}
                        onClick={event => event.target.showPicker()}
                    />
                </div>
            </div>

            <div className='grid grid-cols-2 lg:flex lg:items-center lg:justify-end gap-4 mt-2 lg:mb-0 mb-2'>
                <button
                    type='button'
                    className='text-white col-span-1 bg-custom-gray border-1 border-custom-gray hover:border-gray-500 transition-all hover:bg-gray-500 hover:text-white font-gilroy-bold p-3 px-[35px] text-[13px] rounded focus:outline-none focus:shadow-outline'
                    onClick={() => deleteItem(item)}
                >
                    {t("extraComponents.educationData.delete_button_text")}
                </button>
                <button
                    type='submit'
                    className={`text-text-main_green text-[13px] border col-span-1 border-text-main_green transition-all hover:bg-main-green hover:text-white font-gilroy-bold py-3 px-[35px] rounded focus:outline-none focus:shadow-outline ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
                    disabled={loading}
                    onClick={() => handleExperienceData(index)}
                >
                    {t("extraComponents.educationData.save_button_text")}
                </button>
            </div>

            {/* <div className='grid grid-cols-2 lg:flex lg:items-center gap-4 lg:justify-end mt-2 lg:mb-0 mb-2'>
                <button
                    type='button'
                    className='text-white col-span-1 bg-custom-gray border-1 border-custom-gray hover:border-gray-500 transition-all hover:bg-gray-500 hover:text-white font-gilroy-bold p-3 px-8 rounded focus:outline-none focus:shadow-outline'
                    onClick={() => deleteItem(item)}
                >
                    Удалить
                </button>
                <button
                    type='submit'
                    className={`text-main-green col-span-1 border border-main-green hover:bg-main-green hover:text-white font-gilroy font-bold py-3 px-6 rounded focus:outline-none  focus:shadow-outline ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
                    disabled={loading}
                    onClick={() => handleExperienceData(index)}
                >
                    Сохранить
                </button>
            </div> */}
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onDeleteOneEducation: value => dispatch(deleteOneEducation(value)),
    }
}

export default connect(null, mapDispatchToProps)(memo(EducationData));