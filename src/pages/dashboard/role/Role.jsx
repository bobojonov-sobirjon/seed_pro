import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FaUserTie, FaPenToSquare } from 'react-icons/fa6';
import { getProfile } from '../../../redux/reducers/profileReducer';
import { axiosInstances } from '../../../config/config';
import { errorHandler, getToastWarn } from '../../../utils/options';

function Role(props) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [activeBoxFirst, setActiveBoxFirst] = useState(false);
    const [activeBoxSecond, setActiveBoxSecond] = useState(false);

    // get profile
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        props.onGetProfile({ signal }); // get profile

        return () => controller.abort();
    }, []);

    useEffect(() => {
        if (props.profileData && props.profileData.hasOwnProperty("id")) {
            if (props.profileData.active) {
                setActiveBoxFirst(true);
            } else setActiveBoxSecond(true);
        }
    }, [props.profileData])

    // box1
    const box1Handler = () => {
        setActiveBoxFirst(true);
        setActiveBoxSecond(false);
    }

    // box1
    const box2Handler = () => {
        setActiveBoxFirst(false);
        setActiveBoxSecond(true);
    }

    // swicth checked
    const switchCheckedHandler = async () => {
        if (props.profileData && props.profileData.hasOwnProperty("id")) {
            try {
                const { information, role, avatar, ...others } = props.profileData;
                let obj = {
                    ...others,
                    active: activeBoxFirst ? true : false,
                };
                const res = await axiosInstances.put("/profile/", obj);
                if (res.status === 200 || res.status === 201) {
                    navigate("/admin/pages");
                } else getToastWarn(res.data || res.data?.message);
            } catch (error) {
                // console.log(error);
                errorHandler(error);
            }
        }
    }

    return (
        <div className='h-[100vh] bg-gradient-to-t from-[#000] via-[#001] to-[#002] flex items-center justify-center'>
            <div className='bg-white w-[90%] m-auto flex flex-col items-center justify-center rounded-xl p-4 gap-8'>
                <div>
                    <span className='text-[24px] lg:text-[28px] text-[#1a1a1a] font-gilroy-bold text-center flex justify-center'>
                        {t("roles.title")}
                    </span>
                </div>
                <div className='flex items-center flex-wrap gap-10'>
                    <div className={`shadow-xl p-4 rounded-lg bg-white hover:bg-[#e0eaff] transition-all flex flex-col gap-2 items-center justify-center w-full md:w-[130px] cursor-pointer ${activeBoxFirst && 'border-2 border-text-main_green'} `} onClick={box1Handler}>
                        <FaUserTie className={`${activeBoxFirst ? 'text-text-main_green' : 'text-text-main_green'} p-2`} size={60} />
                        <span className={`${activeBoxFirst ? 'text-text-main_green' : 'text-[#bfbfbf]'} text-[14px] font-gunterz-bold`}>
                            {t("roles.role_one")}
                        </span>
                    </div>
                    <div className={`shadow-xl p-4 rounded-lg bg-white hover:bg-[#e0eaff] transition-all flex flex-col gap-2 items-center justify-center w-full md:w-[130px] cursor-pointer ${activeBoxSecond && 'border-2 border-text-main_green'} `} onClick={box2Handler}>
                        <FaPenToSquare className={`${activeBoxSecond ? 'text-text-main_green' : 'text-text-main_green'} p-2`} size={60} />
                        <span className={`${activeBoxSecond ? 'text-text-main_green' : 'text-[#bfbfbf]'} text-[14px] font-gunterz-bold`}>
                            {t("roles.role_two")}
                        </span>
                    </div>
                </div>
                <div>
                    <button type='button' className='bg-text-main_green hover:bg-main-green text-white text-[14px] py-2 px-10 rounded-full transition-all' onClick={switchCheckedHandler}>
                        {t("roles.button_text")}
                    </button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        profileData: state.profileReducer.profileData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetProfile: (value) => dispatch(getProfile(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Role);