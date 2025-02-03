import React, { memo, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { errorHandler, getToast } from '../../../../utils/options';
import { deleteOneAbout } from '../../../../redux/reducers/profileReducer';
import { axiosInstances } from '../../../../config/config';

function AboutData(props) {
    const { item, index, getData } = props;
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);

    // professional information
    const handleAboutData = async index => {
        let forms = document.querySelectorAll('.forms_about')[index];

        const obj = {
            content: forms.querySelector('.achievements').value,
        };
        setLoading(true);
        try {
            const res = await axiosInstances.put(`/about/${item.id}/`, obj);
            if (res.status) {
                getToast(t("toastMessage.aboutDataPage.edit_success"));
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
        props.onDeleteOneAbout({ item: value });
        getData();
    }

    return (
        <div className='forms_about'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'></div>
            <div className='mt-2'>
                <textarea
                    className='bg-custom-light appearance-none border rounded w-full p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline achievements'
                    name='achievements_about_update'
                    placeholder='Опишите ваши задачи и достижения'
                    rows={5}
                    defaultValue={item?.content}
                />
            </div>

            <div className='grid grid-cols-2 lg:flex lg:items-center lg:justify-end gap-4 mt-2 lg:mb-0 mb-2'>
                <button
                    type='button'
                    className='text-white col-span-1 bg-custom-gray border-1 border-custom-gray hover:border-gray-500 transition-all hover:bg-gray-500 hover:text-white font-gilroy-bold p-3 px-[35px] text-[13px] rounded focus:outline-none focus:shadow-outline'
                    onClick={() => deleteItem(item)}
                >
                    {t("extraComponents.aboutData.delete_button_text")}
                </button>
                <button
                    type='submit'
                    className={`text-text-main_green text-[13px] border col-span-1 border-text-main_green transition-all hover:bg-main-green hover:text-white font-gilroy-bold py-3 px-[35px] rounded focus:outline-none focus:shadow-outline ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
                    disabled={loading}
                    onClick={() => handleAboutData(index)}
                >
                    {t("extraComponents.aboutData.save_button_text")}
                </button>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onDeleteOneAbout: value => dispatch(deleteOneAbout(value)),
    }
}

export default connect(null, mapDispatchToProps)(memo(AboutData));