import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import EducationData from './EducationData';
import { getAllEducations } from '../../../../redux/reducers/profileReducer';
import { errorHandler, getToast } from '../../../../utils/options';
import { axiosInstances } from '../../../../config/config';
import EducationForm from './EducationForm';

function Education(props) {
    const { allEducations } = props;
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

        props.onGetAllEducations({ signal }); // get education

        return () => controller.abort();
    }, []);

    // useEffect(() => {
    //     if (allEducations?.length > 0) {
    //         setOpen(allEducations.length);
    //     }
    // }, [allEducations]);

    // get again data
    const getData = () => {
        props.onGetAllEducations({}); // get profile
    }

    const handleSubmitEducation = async data => {
        const obj = {
            speciality: data.specialty,
            institution: data.institution,
            start_date: start_date_ref.current?.value,
            end_date: end_date_ref.current?.value,
            // start_date: new Date(startDate).toLocaleDateString().split(".").reverse().join("-"),
            // end_date: new Date(endDate).toLocaleDateString().split(".").reverse().join("-"),
        };

        setLoading(true);
        try {
            const res = await axiosInstances.post("/education/", obj);
            if (res.status) {
                getToast(t("toastMessage.educationPage.saved_success"));
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
                {allEducations?.length > 0 && allEducations.map((item, index) => (
                    <pre key={Math.random().toString()}>
                        <Accordion key={Math.random().toString()} open={open === index + 1} className='mb-1'>
                            <AccordionHeader onClick={() => handleOpen(index + 1)} className="text-[16px] p-2 font-normal bg-custom-gray text-white rounded-md hover:text-white">
                                {item?.speciality}
                            </AccordionHeader>
                            <AccordionBody className="dark:text-white text-xs flex flex-col gap-1 p-2 shadow-md px-1 pt-1">
                                <EducationData
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
                        {t("dashboard.profile.education.title")}
                    </span>
                    <EducationForm
                        handleSubmitEducation={handleSubmitEducation}
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
        allEducations: state.profileReducer.allEducations,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetAllEducations: (value) => dispatch(getAllEducations(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(Education));