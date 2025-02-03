import React, { memo, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import { getAllAbout } from '../../../../redux/reducers/profileReducer';
import { errorHandler, getToast } from '../../../../utils/options';
import { axiosInstances } from '../../../../config/config';
import AboutData from './AboutData';
import AboutForm from './AboutForm';

function About(props) {
    const { allAbout } = props;
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(0);

    // get professional information
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        props.onGetAllAbout({ signal }); // get profile

        return () => controller.abort();
    }, []);

    // useEffect(() => {
    //     if (allAbout?.length > 0) {
    //         setOpen(allAbout.length);
    //     }
    // }, [allAbout]);

    // get again data
    const getData = () => {
        props.onGetAllAbout({}); // get profile
    }

    const handleSubmitAbout = async data => {
        const obj = {
            content: data.content,
        };

        setLoading(true);
        try {
            const res = await axiosInstances.post("/about/", obj);
            if (res.status) {
                getToast(t("toastMessage.aboutPage.saved_success"));
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
                {allAbout?.length > 0 && allAbout.map((item, index) => (
                    <pre key={Math.random().toString()}>
                        <Accordion key={Math.random().toString()} open={open === index + 1} className='mb-1'>
                            <AccordionHeader onClick={() => handleOpen(index + 1)} className="text-[16px] p-2 font-normal bg-custom-gray text-white rounded-md hover:text-white">
                                {item?.content}
                            </AccordionHeader>
                            <AccordionBody className="dark:text-white text-xs flex flex-col gap-1 p-2 shadow-md px-1 pt-1">
                                <AboutData
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
                        {t("dashboard.profile.about_me.title")}
                    </span>
                    <AboutForm
                        handleSubmitAbout={handleSubmitAbout}
                        register={register}
                        handleSubmit={handleSubmit}
                        loading={loading}
                        errors={errors}
                    />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        allAbout: state.profileReducer.allAbout,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetAllAbout: (value) => dispatch(getAllAbout(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(About));