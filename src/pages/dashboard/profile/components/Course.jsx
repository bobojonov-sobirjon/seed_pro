import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import CourseData from './CourseData';
import { errorHandler, getToast } from '../../../../utils/options';
import { axiosInstances } from '../../../../config/config';
import { getAllCourses } from '../../../../redux/reducers/profileReducer';
import CourseForm from './CourseForm';

function Course(props) {
    const { allCourses } = props;
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(0);
    const start_date_ref = useRef();
    const end_date_ref = useRef();

    // get professional information
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        props.onGetAllCourses({ signal }); // get all course

        return () => controller.abort();
    }, []);

    // useEffect(() => {
    //     if (allCourses?.length > 0) {
    //         setOpen(allCourses.length);
    //     }
    // }, [allCourses]);

    // get again data
    const getData = () => {
        props.onGetAllCourses({}); // get profile
    }

    const handleSubmitCourse = async data => {
        const obj = {
            name: data.specialty,
            institution: data.institution,
            start_date: start_date_ref.current?.value,
            end_date: end_date_ref.current?.value,
        };
        // console.log(obj);

        setLoading(true);
        try {
            const res = await axiosInstances.post("/course/", obj);
            if (res.status) {
                getToast(t("toastMessage.coursePage.saved_success"));
                reset();
                setLoading(false);
                getData();
            }
        } catch (error) {
            setLoading(false);
            errorHandler(error);
        }
    };

    // open accorsion
    const handleOpen = useCallback((value) => {
        setOpen(open === value ? 0 : value);
    }, [open]);

    return (
        <div className='max-w-5xl mx-auto my-10 p-2 lg:p-6 bg-white shadow-lg rounded-lg'>
            <div>
                {allCourses?.length > 0 && allCourses.map((item, index) => (
                    <pre key={Math.random().toString()}>
                        <Accordion key={Math.random().toString()} open={open === index + 1} className='mb-1'>
                            <AccordionHeader onClick={() => handleOpen(index + 1)} className="text-[16px] p-2 font-normal bg-custom-gray text-white rounded-md hover:text-white">
                                {item?.name}
                            </AccordionHeader>
                            <AccordionBody className="dark:text-white text-xs flex flex-col gap-1 p-2 px-1 pt-1">
                                <CourseData
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
                        {t("dashboard.profile.courses_training.title")}
                    </span>
                    <CourseForm
                        handleSubmitCourse={handleSubmitCourse}
                        register={register}
                        errors={errors}
                        handleSubmit={handleSubmit}
                        start_date_ref={start_date_ref}
                        end_date_ref={end_date_ref}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        allCourses: state.profileReducer.allCourses,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetAllCourses: (value) => dispatch(getAllCourses(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(Course));