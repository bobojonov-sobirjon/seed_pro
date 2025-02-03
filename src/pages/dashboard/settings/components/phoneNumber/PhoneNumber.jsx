import React, { memo, useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import { useTranslation } from 'react-i18next';
import { errorHandler, getToast, getToastWarn } from '../../../../../utils/options';
import { axiosInstances } from '../../../../../config/config';

function PhoneNumber({ data }) {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState((data && data.phone) ? data.phone : "");

    // handle submit email
    const handleSubmit = async () => {
        if (phoneNumber?.length > 0) {
            setLoading(true);
            try {
                let obj = {
                    active: data.active,
                    email: data.email,
                    id: data.id,
                    phone: phoneNumber,
                    username: data.username,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    counrty: data.counrty,
                    city: data.city,
                    sex: data.sex,
                    birth_date: data.birth_date,
                };
                const res = await axiosInstances.put("/profile/", obj);
                if (res.status === 200 || res.status === 201) {
                    getToast(t("toastMessage.phoneNumberPage.edit_success"));
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
        }
    }

    return (
        <>
            <div className='flex items-end gap-4 settings_phone'>
                <div className='w-full'>
                    <span className='block font-gilroy text-sm font-bold mb-2'>
                        {t("dashboard.settings.phone_input_label")}
                    </span>
                    <PhoneInput
                        className={`phone focus:outline-none w-full h-[30px]`}
                        defaultCountry="ru"
                        value={phoneNumber}
                        onChange={(phone) => setPhoneNumber(phone)}
                        placeholder={t("dashboard.settings.phone_input_placeholder")}
                        name="phone"
                        autoComplete="tel"
                        required
                    />
                </div>
                <button
                    type='button'
                    onClick={handleSubmit}
                    className={`bg-custom-gray hover:bg-gray-900 text-white font-gilroy p-2 lg:p-3 rounded-md focus:outline-none focus:shadow-outline ${loading ? "cursor-not-allowed" : "cursor-pointer"} text-]13px] lg:text-[15px]`}
                    disabled={loading}
                >
                    {t("dashboard.settings.phone_input_button")}
                </button>
            </div>
        </>
    )
}

export default memo(PhoneNumber);