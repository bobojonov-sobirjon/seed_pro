import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import ProfessionalInfoData from './ProfessionalInfoData';
import ProfessionalInfoForm from './ProfessionalInfoForm';
import { getProfessioanalInformation } from '../../../../redux/reducers/profileReducer';
import { errorHandler, getToast } from '../../../../utils/options';
import { axiosInstances } from '../../../../config/config';

function ProfessionalInfo(props) {
    const { professionalInfo } = props;
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(0);
    const level_ref = useRef();
    const language_level_ref = useRef();

    // get professional information
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        props.onGetProfessioanalInformation({ signal }); // get profile

        return () => controller.abort();
    }, []);

    // useEffect(() => {
    //     if (professionalInfo?.length > 0) {
    //         setOpen(professionalInfo.length);
    //     }
    // }, [professionalInfo]);

    // get again data
    const getData = () => {
        props.onGetProfessioanalInformation({}); // get profile
    }

    // open accorsion
    const handleOpen = useCallback((value) => {
        setOpen(open === value ? 0 : value);
    }, [open]);

    // professional information
    const handleProfessionalInformation = async data => {
        const obj = {
            career_objective: data.position,
            level: level_ref.current?.value,
            laguage: data.language,
            laguage_level: language_level_ref.current?.value,
            skills: data.skills,
        };
        // console.log(obj);
        setLoading(true);
        try {
            const res = await axiosInstances.post("/professional/information/", obj);
            if (res.status) {
                getToast(t("toastMessage.professionalInfoPage.saved_success"));
                reset();
                setLoading(false);
                getData();
            }
        } catch (error) {
            // console.log(error);
            // getToastError(error?.message);
            errorHandler(error);
            setLoading(false);
        }
    };

    return (
        <>
            <div className='max-w-5xl mx-auto my-10 p-2 lg:p-6 bg-white shadow-lg rounded-lg'>
                <div>
                    {professionalInfo?.length > 0 ? professionalInfo.map((item, index) => (
                        <pre key={Math.random().toString()}>
                            <Accordion open={open === index + 1} className='mb-1'>
                                <AccordionHeader onClick={() => handleOpen(index + 1)} className="text-[16px] p-2 font-normal bg-custom-gray text-white rounded-md hover:text-white">
                                    {item.career_objective}
                                </AccordionHeader>
                                <AccordionBody className="dark:text-white text-xs flex flex-col gap-1 p-2 shadow-md px-1">
                                    <ProfessionalInfoData
                                        item={item}
                                        index={index}
                                        getData={getData}
                                    />
                                </AccordionBody>
                            </Accordion>

                            {index + 1 === professionalInfo.length && (
                                <div className="dark:text-white text-xs flex flex-col gap-1 p-2 px-1 lg:px-2 py-4">
                                    <span className='text-[20px] lg:text-[24px] font-medium text-custom-gray mb-8 lg:text-left text-center'>
                                        {t("dashboard.profile.professional_information.title")}
                                    </span>
                                    <ProfessionalInfoForm
                                        handleProfessionalInformation={handleProfessionalInformation}
                                        register={register}
                                        errors={errors}
                                        handleSubmit={handleSubmit}
                                        language_level_ref={language_level_ref}
                                        level_ref={level_ref}
                                        loading={loading}
                                    />
                                </div>
                            )}
                        </pre>
                    )) : (
                        <div className="dark:text-white text-xs flex flex-col gap-1 p-2 px-1 lg:px-2 py-4">
                            <span className='text-[20px] lg:text-[24px] font-medium text-custom-gray mb-8 lg:text-left text-center'>
                                {t("dashboard.profile.professional_information.title")}
                            </span>
                            <ProfessionalInfoForm
                                handleProfessionalInformation={handleProfessionalInformation}
                                register={register}
                                errors={errors}
                                handleSubmit={handleSubmit}
                                loading={loading}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        professionalInfo: state.profileReducer.professionalInfo,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetProfessioanalInformation: (value) => dispatch(getProfessioanalInformation(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(ProfessionalInfo));