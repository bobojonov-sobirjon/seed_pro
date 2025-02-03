import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { careers } from '../../../mock';
import girlCareerImage from '../../../assets/images/girl-career.png';
import CareerCard from '../../../components/career-card/CareerCard';

function Career() {
    const { t } = useTranslation();
    let language = localStorage.getItem("language");

    return (
        // {/* career section */ }
        <div className='py-16 bg-blue mt-8' >
            <h2 className='font-gunterz text-custom-gray text-[20px] lg:text-[30px] font-normal text-center flex flex-col gap-1'>
                <p>
                    <span className="text-[#b7ed1d]">{t("home.career.title_one")}</span>
                    &nbsp; {t("home.career.title_two")}
                </p>
                <span className="">{t("home.career.title_four")}</span>
            </h2>
            <div className='flex lg:flex-row flex-col-reverse items-end mt-12 gap-8 lg:gap-8 w-full md:w-[97%]'>
                <div className={`${language == "cn" ? "w-[100%]" : "w-full"} h-full`}>
                    <img src={girlCareerImage} alt='career' className='w-full h-full' />
                </div>
                <div className='grid mt-0 lg:mt-12 lg:grid-cols-2 grid-cols-1 gap-2 lg:gap-6 p-4 pb-0 w-full'>
                    {careers?.length > 0 && careers.map((career, index) => (
                        <CareerCard
                            key={index}
                            number={career.number}
                            title={t(`home.career.items.${index}.content`)}
                            description={t(`home.career.items.${index}.description`)}
                            image={career.imageSrc}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default memo(Career);