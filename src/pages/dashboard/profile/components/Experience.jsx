import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import { getAllExperience } from '../../../../redux/reducers/profileReducer';
import { errorHandler, getToast } from '../../../../utils/options';
import { axiosInstances } from '../../../../config/config';
import ExperienceData from './ExperienceData';
import ExperienceForm from './ExperienceForm';

function Experience(props) {
    const { allExperience } = props;
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(0);
    const current_check_ref = useRef();
    const start_date_ref = useRef();
    const end_date_ref = useRef();

    // get professional information
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        props.onGetAllExperience({ signal }); // get profile

        return () => controller.abort();
    }, []);

    // useEffect(() => {
    //     if (allExperience?.length > 0) {
    //         setOpen(allExperience.length);
    //     }
    // }, [allExperience]);

    // get again data
    const getData = () => {
        props.onGetAllExperience({}); // get profile
    }

    const handleExperience = async data => {
        const obj = {
            job_title: data.position,
            company: data.company,
            beginning_work: start_date_ref.current.value,
            finishing_work: end_date_ref.current.value,
            until_now: current_check_ref.current.checked,
            achievement: data.achievements,
        };

        setLoading(true);
        try {
            const res = await axiosInstances.post("/experience/", obj);
            if (res.status) {
                getToast(t("toastMessage.experiencePage.saved_success"));
                reset();
                setLoading(false);
                getData();
            }
        } catch (error) {
            // console.log(error);
            setLoading(false);
            errorHandler(error);
        }
    };

    // open accordion
    const handleOpen = useCallback((value) => {
        setOpen(open === value ? 0 : value);
    }, [open]);

    return (
        <div className='max-w-5xl mx-auto my-10 p-2 lg:p-6 bg-white shadow-lg rounded-lg'>
            <div>
                {allExperience?.length > 0 && allExperience.map((item, index) => (
                    <pre key={Math.random().toString()}>
                        <Accordion open={open === index + 1} className='mb-1'>
                            <AccordionHeader onClick={() => handleOpen(index + 1)} className="text-[16px] p-2 font-normal bg-custom-gray text-white rounded-md hover:text-white">
                                {item.job_title}
                            </AccordionHeader>
                            <AccordionBody className="dark:text-white text-xs flex flex-col gap-1 p-2 shadow-md px-1 pt-1">
                                <ExperienceData
                                    item={item}
                                    index={index}
                                    getData={getData}
                                />
                            </AccordionBody>
                        </Accordion>
                    </pre>
                ))}

                <div className="dark:text-white text-xs flex flex-col gap-1 p-2 px-1 lg:px-2 py-4">
                    <span className='text-[20px] lg:text-[24px] font-medium text-custom-gray mb-8 lg:text-left text-center'>
                        {t("dashboard.profile.experience.title")}
                    </span>
                    <ExperienceForm
                        handleExperience={handleExperience}
                        register={register}
                        errors={errors}
                        handleSubmit={handleSubmit}
                        start_date_ref={start_date_ref}
                        end_date_ref={end_date_ref}
                        current_check_ref={current_check_ref}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        allExperience: state.profileReducer.allExperience,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetAllExperience: (value) => dispatch(getAllExperience(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(Experience));