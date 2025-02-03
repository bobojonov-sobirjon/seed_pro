import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { stats } from '../../../mock';
import projectCardImage from '../../../assets/images/project-card.png';

function Project() {
    const { t } = useTranslation();

    return (
        // {/* projects section */ }
        <a name="about">
            <div className='bg-[#f9f9f9] p-4 lg:p-16 my-12 lg:mt-0'>
                <div className='text-center mb-12'>
                    <h2 className='text-[20px] lg:text-[30px] font-medium text-custom-gray font-gunterz'>
                        {t("home.project.title")}
                    </h2>
                </div>
                <div className='flex flex-col-reverse md:grid md:grid-cols-1 lg:grid-cols-2 mx-auto gap-10 lg:gap-0'>
                    <div className='col-span-1 flex flex-col gap-4 justify-center'>
                        <h2 className='font-bold text-[20px] lg:text-[30px] text-center lg:text-left text-custom-gray font-montserrat'>
                            {t("home.project.left_title")}
                        </h2>
                        <p className='text-[#7c7c7c] text-[13px] lg:text-[16px] text-center lg:text-left lg:pr-20 font-bold font-gilroy flex flex-col'>
                            <span>{t("home.project.left_description_top")}</span>
                            <span>{t("home.project.left_description_bottom")}</span>
                        </p>
                    </div>
                    <div className='col-span-1'>
                        <div className='grid grid-cols-2 lg:grid-cols-2 gap-2 lg:gap-16'>
                            <div
                                style={{ backgroundImage: `url(${projectCardImage})` }}
                                className='bg-black flex relative rounded-xl shadow-lg px-4 lg:px-6 py-6 lg:py-10 text-start'
                            >
                                <div className='flex flex-col justify-center'>
                                    <h3 className='lg:text-4xl text-[26px] text-main-green font-bold mb-2 font-montserrat'>
                                        55+
                                    </h3>
                                    <p className='text-white lg:text-[15px] text-[14px] flex flex-wrap font-semibold font-gilroy w-[60%]'>
                                        <span className={``}>
                                            {t("home.project.right_count_one_title")}
                                        </span>
                                    </p>
                                </div>
                                <div className='absolute -right-6 lg:-right-20 -top-7 lg:-top-10'>
                                    <img className={`w-[120px] md:w-[150px] lg:w-[210px]`} src={stats[0].image} alt='' />
                                    {/* <img className={`w-[35vw] lg:w-[15vw]`} src={stats[0].image} alt='' /> */}
                                </div>
                            </div>
                            <div
                                style={{ backgroundImage: `url(${projectCardImage})` }}
                                className='bg-black flex relative rounded-xl shadow-lg px-4 lg:px-6 py-6 lg:py-10 text-start'
                            >
                                <div className='flex flex-col justify-center'>
                                    <h3 className='lg:text-4xl text-[26px] text-main-green font-bold mb-2 font-montserrat'>
                                        60+
                                    </h3>
                                    <p className='text-white lg:text-[15px] text-[14px] flex flex-wrap font-semibold font-gilroy w-[55%] lg:w-[60%]'>
                                        <span className={``}>
                                            {t("home.project.right_count_two_title")}
                                        </span>
                                    </p>
                                </div>
                                <div className='absolute -right-3 md:-right-10 -top-6 md:-top-10'>
                                    <img className={`w-[100px] md:w-[150px] lg:w-[210px]`} src={stats[1].image} alt='' />
                                    {/* <img className={`w-[35vw] lg:w-[15vw]`} src={stats[1].image} alt='' /> */}
                                </div>
                            </div>
                            <div
                                style={{ backgroundImage: `url(${projectCardImage})` }}
                                className='bg-black flex relative rounded-xl shadow-lg px-4 lg:px-6 py-6 lg:py-10 text-start'
                            >
                                <div className='flex flex-col justify-center'>
                                    <h3 className='lg:text-4xl text-[26px] text-main-green font-bold mb-2 font-montserrat'>
                                        500+
                                    </h3>
                                    <p className='text-white lg:text-[15px] text-[14px] flex flex-wrap font-semibold font-gilroy w-[60%]'>
                                        <span className={``}>
                                            {t("home.project.right_count_three_title")}
                                        </span>
                                    </p>
                                </div>
                                <div className='absolute -right-7 lg:-right-12 top-0 lg:-top-11'>
                                    <img className={`w-[130px] md:w-[140px] lg:w-[210px]`} src={stats[2].image} alt='' />
                                    {/* <img className={`w-[35vw] lg:w-[15vw] xl:w-[210px]`} src={stats[2].image} alt='' /> */}
                                </div>
                            </div>
                            <div
                                style={{ backgroundImage: `url(${projectCardImage})` }}
                                className='bg-black flex relative rounded-xl shadow-lg px-4 lg:px-6 py-6 lg:py-10 text-start'
                            >
                                <div className='flex flex-col justify-center gap-2 lg:gap-0'>
                                    <h3 className='lg:text-4xl text-[26px] text-main-green font-bold mb-2 font-montserrat'>
                                        &nbsp;
                                    </h3>
                                    <p className='text-white lg:text-[15px] text-[14px] flex flex-wrap font-semibold font-gilroy w-[70%]'>
                                        <span className={``}>
                                            {t("home.project.right_count_four_title")}
                                        </span>
                                    </p>
                                </div>
                                <div className='absolute right-6 lg:-right-12 -top-6 lg:-top-11'>
                                    <img className={`w-[120px] md:w-[130px] lg:w-[190px]`} src={stats[3].image} alt='' />
                                    {/* <img className={`w-[30vw] lg:w-[15vw] xl:w-[190px]`} src={stats[3].image} alt='' /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    )
}

export default memo(Project);