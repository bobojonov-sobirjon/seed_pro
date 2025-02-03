import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import backgroundImage from './../../../assets/images/seed-background.png';
import girlImage from '../../../assets/images/main_girl_banner.png';

function Banner() {
    const { t } = useTranslation();

    return (
        <div className='bg-cover bg-center relative lg:h-[calc(100vh_-_70px)]' style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className='pt-10 pb-0 lg:pb-10 grid grid-cols-1 lg:grid-cols-3 justify-center items-center gap-10 lg:gap-0 h-full relative'>
                {/* Content Area */}
                <div className='flex flex-col items-start flex-wrap col-span-1 lg:col-span-2 lg:pl-20 px-4 mt-4 lg:mt-0'>
                    <h3 className='text-text-main_green text-[12px] lg:text-[14px] mb-1'>
                        {t("home.main.top_title")}
                    </h3>
                    <p className='text-white uppercase font-bold text-2xl lg:text-4xl w-full lg:w-[80%]'>
                        <span>
                            {t("home.main.title_one")}{" "}
                            <span className="text-text-main_green">
                                {t("home.main.title_two")}
                            </span>{" "}
                            {t("home.main.title_three")}{" "}
                            <span className="text-text-main_green">
                                {t("home.main.title_four")}
                            </span>
                        </span>
                    </p>
                    <p className='text-[#d1d1d1] text-[13px] lg:text-[14px] pt-4 w-full lg:w-[60%] font-medium'>
                        {t("home.main.description")}
                    </p>
                    <a href="#howwork">
                        <button className='py-2 px-[60px] lg:py-4 bg-text-main_green hover:bg-main-green-hover font-gilroy-bold rounded text-white mt-8 text-[14px]'>
                            {t("home.main.button_text")}
                        </button>
                    </a>
                </div>

                {/* image */}
                <div className='col-span-1 lg:absolute right-0 w-full lg:w-[40%] h-full lg:h-[90%] xxxl:h-auto'>
                    <div className='w-full h-full flex items-center no-repeat bg-cover relative'>
                        <img src={girlImage} alt='error image' className='w-full h-full' />
                    </div>
                </div>
            </div>
            {/* Image Area */}
            {/* <div className='flex-1 flex absolute top-10 bottom-10 right-0'>
      <div className='w-full h-full flex items-center no-repeat bg-cover relative'>
        <img src={girlImage} alt='error image' className='w-full h-full' />
      </div>
    </div> */}
        </div>
    )
}

export default memo(Banner);