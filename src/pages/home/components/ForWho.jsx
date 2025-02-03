import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import RegisterCard from '../../../components/register-card/RegisterCard';
import { HowWorkCard } from '../../../components';
import { forWhoDatas } from '../../../mock';
import qRightImg from '../../../assets/q_right.png';
import qLeftImg from '../../../assets/q_left.png';

function ForWho() {
    const { t } = useTranslation();

    return (
        // {/* for who section */ }
        <a name="forwho">
            <div className='bg-[#070a0f] p-2 lg:p-8 text-white pt-10 lg:pt-8' >
                <div className='px-4 py-12 relative'>
                    <h1 className='text-[19px] lg:text-[30px] p-0 font-gunterz block clone-text font-bold text-center mb-0'>
                        {t("home.forWho.title_top")}
                    </h1>
                    <h1 className='text-[20px] lg:text-[30px] p-0 mt-[-14px] lg:mt-[-24px] text-white block font-bold text-center uppercase'>
                        {t("home.forWho.title_bottom")}
                    </h1>

                    <div className='hidden lg:block'>
                        <img src={qRightImg} className='absolute top-0 right-[220px]' alt="" />
                        <img src={qLeftImg} className='absolute top-4 left-[200px] xl:left-[280px]' alt="" />
                    </div>

                    <div className='mt-12 grid lg:grid-cols-3 grid-cols-1 gap-6'>
                        {forWhoDatas?.length > 0 && forWhoDatas.map((work, index) => (
                            <HowWorkCard
                                image={work.imageSrc}
                                content={t(`home.forWho.items.${index}.content`)}
                                description={t(`home.forWho.items.${index}.description`)}
                                key={index}
                            />
                        ))}
                    </div>

                    <div className='text-center mt-8'>
                        <RegisterCard />
                    </div>
                </div>
            </div>
        </a>
    )
}

export default memo(ForWho);