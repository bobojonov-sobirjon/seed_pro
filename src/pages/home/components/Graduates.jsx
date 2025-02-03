import React, { memo, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import SwiperCore from 'swiper/core';
import { useTranslation } from 'react-i18next';
import { FaCaretLeft } from 'react-icons/fa';
import { FaCaretRight } from 'react-icons/fa';
import { graduates } from '../../../mock';
import GraduatesCars from '../../../components/graduates-card/GraduatesCars';
import hatImg from '../../../assets/hat.svg';
import hatMobileImg from '../../../assets/hat_mobile.svg';

function Graduates() {
    const swiperRef = useRef(null);
    SwiperCore.use([Navigation, Pagination]);
    const { t } = useTranslation();

    const goNext = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideNext();
        }
    };

    const goPrev = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slidePrev();
        }
    };

    // mouse enter handler
    const mouseEnterHandler = (event, name) => {
        document.querySelector(`.${name}`).style.borderColor = "#b7ed1d";
    }

    // mouse up
    const mouseUpHandler = (event, name) => {
        document.querySelector(`.${name}`).style.borderColor = "#474747";
    }

    return (
        // {/* Graduates section */ }
        <div className='p-2 relative' >
            <div className='container mx-auto px-4 py-12'>
                <h1 className='text-custom-gray text-center text-[20px] lg:text-[30px] font-gunterz uppercase mt-10 mb-20 flex items-center flex-col lg:flex-row justify-center'>
                    <span className="w-full lg:w-[80%]">
                        <span className="text-text-main_green">
                            {t("home.graduate.title_one")}
                        </span>
                        , {t("home.graduate.title_two")}
                    </span>
                </h1>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    pagination={false}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                    }}
                    ref={swiperRef}

                >
                    {graduates.map((graduate, index) => (
                        <SwiperSlide key={index}>
                            <GraduatesCars
                                image={graduate.imageSrc}
                                title={graduate.title}
                                description={t(`home.graduate.items.${index}.description`)}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className='flex items-center justify-center gap-4 mt-6'>
                    <button
                        className='border border-gray-600 p-3 rounded-md prev_button'
                        onClick={goPrev}
                        onMouseDown={event => mouseEnterHandler(event, "prev_button")}
                        onMouseUp={event => mouseUpHandler(event, "prev_button")}
                    >
                        <FaCaretLeft />
                    </button>{' '}
                    <button
                        className='border border-gray-600 p-3 rounded-md next_button'
                        onClick={goNext}
                        onMouseDown={event => mouseEnterHandler(event, "next_button")}
                        onMouseUp={event => mouseUpHandler(event, "next_button")}
                    >
                        <FaCaretRight />
                    </button>
                </div>
            </div>

            {/* desktop */}
            <div className='absolute -top-20 -left-10 hidden lg:block'>
                <img src={hatImg} alt="" />
            </div>
            {/* mobile */}
            <div className='absolute -top-8 -left-20 block lg:hidden overflow-hidden'>
                <img src={hatMobileImg} alt="" />
            </div>
        </div>
    )
}

export default memo(Graduates);