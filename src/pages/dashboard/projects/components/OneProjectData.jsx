import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { levels } from '../../../../utils/options';
import { useAuth } from '../../../../services/useAuth';
import { getProfile } from '../../../../redux/reducers/profileReducer';

function OneProjectData(props) {
    const { state } = props;
    const { t } = useTranslation();
    let { user_id } = useAuth();

    // get all projects
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        props.onGetProfile({ signal }); // get profile

        return () => controller.abort();
    }, []);
    return (
        state && state.komanda?.length > 0 && state.komanda.map(elem => (
            elem?.length > 0 && elem.map(item => (
                <div key={item.id} className='p-2 lg:p-6 bg-white shadow-lg rounded-lg'>
                    <div className='flex items-center justify-between mb-1'>
                        <div className='flex items-center gap-2'>
                            <img src={item?.project_image} alt="" />
                            <span className='text-xl font-gilroy-bold font-bold text-custom-gray'>
                                {item.position}
                            </span>
                            <span className='text-main-green py-1 px-3 text-sm'>
                                {levels.find(el => el.value == item.level)?.name}
                            </span>
                        </div>
                        {/* <div>
                        <IoStarOutline className='text-[26px] text-main-green' />
                    </div> */}
                    </div>
                    <hr className='h-[2px] bg-gray-200' />
                    <div className='flex flex-col gap-2 mt-2'>
                        <div className=''>
                            <h3 className='font-gilroy-bold text-custom-gray text-sm'>
                                <span className="font-semibold">
                                    {t("dashboard.pages.one_project_view.tasks_and_acheiv")} &nbsp;
                                </span>
                                <span className='text-gray-600'>
                                    {item.tasks}
                                </span>
                            </h3>
                        </div>
                        <div className=''>
                            <h3 className='font-gilroy-bold text-sm text-custom-gray'>
                                <span className="font-semibold">
                                    {t("dashboard.pages.one_project_view.skills")} &nbsp;
                                </span>
                                {item.tags?.length > 0 && item.tags.map((el, index) => (
                                    <span key={el.id} className=' text-gray-500'>{el.name} {item.tags?.length - 1 !== index && ","}</span>
                                ))}
                            </h3>
                        </div>
                    </div>
                    {state?.owner?.id != user_id && (
                        <div className='flex items-center justify-end'>
                            <button
                                className='bg-custom-gray font-gilroy-bold lg:w-auto w-full hover:bg-gray-600 transition-all text-white py-4 px-8 text-sm rounded focus:outline-none focus:shadow-outline mt-4'
                                onClick={() => props.openReplyModalHandler(item, state)}
                                title='svoy proyekt'
                            >
                                {t("dashboard.pages.one_project_view.reply")}
                            </button>
                        </div>
                    )}
                </div>
            ))
        ))
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

export default connect(mapStateToProps, mapDispatchToProps)(memo(OneProjectData));