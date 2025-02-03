import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

function TimeFormat() {
    const { t } = useTranslation();

    return (
        <div className=''>
            <span className='block text-gray-700 text-sm mb-2'>
                {t("dashboard.settings.time_input_label")}
            </span>
            <select
                className='block appearance-none w-full bg-white hover:border-gray-500 p-3 lg:p-4 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
                id='timezone'
                name='timezone'
            >
                <option value='12' selected>UTC-12</option>
                <option value='24'>UTC-24</option>
            </select>
        </div>
    )
}

export default memo(TimeFormat);