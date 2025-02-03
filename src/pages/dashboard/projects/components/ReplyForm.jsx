import React, { memo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { levels } from '../../../../utils/options';

function ReplyForm(props) {
    const { element } = props;
    const { t } = useTranslation();
    const { value, state } = element;
    const { register, handleSubmit, formState: { errors } } = useForm();

    // submit data
    const submitHandler = data => {
        if (data.desc.trim()?.length > 0 && state) {
            props.replyHandler({
                project: state.id,
                description: data.desc,
                // owner: state.owner?.id,
            });
        }
    }

    return (
        <form onSubmit={handleSubmit(data => submitHandler(data))}>
            <div className="sm:text-left text-txt_color-slate p-2 md:p-6 lg:p-14 flex flex-col">
                <div className="text-sm sm:text-base font-normal flex items-center gap-4">
                    <h3 className='font-semibold text-[22px]'>{value ? value.position : ""}</h3>
                    <strong className='text-main-green font-thin text-[15px]'>{value ? levels.find(el => el.value == value.level)?.name : ""}</strong>
                    {/* <span className='cursor-pointer text-[22px]' onClick={props.closeModal}>&times;</span> */}
                </div>
                <hr className='h-[2px] bg-gray-200 mt-2 mb-1' />

                <div className='flex flex-col gap-2 mt-2'>
                    <div className=''>
                        <h3 className='font-gilroy-bold text-custom-gray text-sm'>
                            <span className="font-semibold">
                                {t("extraComponents.replyForm.tasks_and_acheiv")} &nbsp;
                            </span>
                            <span className='text-gray-600'>
                                {value ? value.tasks : ""}
                            </span>
                        </h3>
                    </div>
                    <div className=''>
                        <h3 className='font-gilroy-bold text-sm text-custom-gray'>
                            <span className="font-semibold">
                                {t("extraComponents.replyForm.skills")} &nbsp;
                            </span>
                            {value && value.tags?.length > 0 && value.tags.map((el, index) => (
                                <span key={el.id} className=' text-gray-500'>{el.name} {value.tags?.length - 1 !== index && ","}</span>
                            ))}
                        </h3>
                    </div>
                </div>

                <div className='flex flex-col'>
                    <span className='text-custom-gray text-[14px] mb-2 mt-8'>
                        {t("extraComponents.replyForm.write_letter")}
                    </span>
                    <textarea
                        placeholder={t(
                            "extraComponents.replyForm.write_letter_input_placeholder"
                        )}
                        className={`bg-custom-light border border-custom-light outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 ${errors.desc ? "border-red-700" : "border-custom-light"}`}
                        rows={4}
                        {...register('desc', { required: true })}
                    />
                </div>

                <div className='grid grid-cols-2 lg:flex lg:items-center gap-4 mt-8 lg:mb-0 mb-2 text-[14px]'>
                    <button
                        type='button'
                        className='text-white col-span-1 bg-custom-gray transition-all hover:bg-gray-700 hover:text-white font-gilroy-bold py-5 px-10 rounded focus:outline-none focus:shadow-outline'
                        onClick={props.closeModal}
                    >
                        {t("extraComponents.replyForm.cancel_button_text")}
                    </button>
                    <button
                        type='submit'
                        className={`text-white col-span-1 transition-all bg-main-green font-gilroy font-semibold py-5 px-10 rounded focus:outline-none focus:shadow-outline`}
                    >
                        {t("extraComponents.replyForm.send_button_text")}
                    </button>
                </div>
            </div>
        </form>
    )
}

export default memo(ReplyForm);