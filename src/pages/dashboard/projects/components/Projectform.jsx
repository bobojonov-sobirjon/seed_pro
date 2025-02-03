import React, { memo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import InputTag from '../../../../components/InputTag';

function Projectform({ tag_ref, data, changeInputHandler, deleteItem, changeTagsInputHandler, changeExtraInputHandler, addItemHandler, deleteItemHandler, deleteTags, levels, extraData }) {
    
    const { t } = useTranslation();

    // click handler
    const clickHandler = (event, index, idx) => {
        if (tag_ref.current?.value) {
            changeTagsInputHandler({ id: Math.random().toString(), name: tag_ref.current.value }, index, idx);
            setTimeout(() => {
                tag_ref.current.value = "";
            }, 10);
            // let arr = data.filter(el => el.id === id);
            // let isTrue = arr.tags?.length > 0 ? arr.tags.find(el => el.name === tag_ref.current.value) : false;
            // if (!isTrue) {
            //     if (arr.tags?.length === 0)
            //         changeTagsInputHandler({ id: Math.random().toString(), name: tag_ref.current.value }, id, 0);
            //     else
            //         changeTagsInputHandler({ id: Math.random().toString(), name: tag_ref.current.value }, id, 1);

            //     tag_ref.current.focus();
            // } else getToastWarn("Невозможно повторить.");

            // setTimeout(() => {
            //     tag_ref.current.value = "";
            // }, 10);
        }
    }

    // add tag base optional
    const enterClick = (event, index, idx) => {
        if (event.keyCode === 13) {
            clickHandler(event, index, idx);
        }
    };

    // delete tag base optional
    const deleteTag = (index, idx, tag_id) => {
        deleteTags(index, idx, tag_id);
    };
    
    return (
        data.map((item, index) => (
            item?.length > 0 && item.map((el, idx) => (
                <div key={el.id} className='bg-white px-2 lg:px-8 pt-6 pb-4 lg:pb-8 rounded shadow my-4'>
                    {extraData?.length > 0 && extraData[index].map((elem, i) => (
                        <div key={elem.id} className='grid grid-cols-1 lg:grid-cols-7 gap-4 items-end'>
                            <div className='col-span-2'>
                                <span className='block text-sm font-medium text-gray-700'>
                                    {t(
                                        "dashboard.myProjects.create.extra_form.specialist_input_label"
                                    )}{" "} <span className='text-red-500'> *</span>
                                </span>
                                <input
                                    type='text'
                                    id='Специалист'
                                    className={`bg-gray-50 text-gray-900 text-sm rounded-lg border outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5`}
                                    placeholder={t(
                                        "dashboard.myProjects.create.extra_form.specialist_input_label"
                                    )}
                                    value={elem.specialist}
                                    onChange={event => changeExtraInputHandler(event.target.value, index, i, 'specialist')}
                                />
                            </div>
                            <div className='col-span-2'>
                                <span className='block text-sm font-medium text-gray-700'>
                                    {t(
                                        "dashboard.myProjects.create.extra_form.count_people_input_label"
                                    )}{" "} <span className='text-red-500'> *</span>
                                </span>
                                <input
                                    type='number'
                                    id='Сколько человек необходимо?'
                                    className={`bg-gray-50 text-gray-900 text-sm rounded-lg border outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5`}
                                    placeholder={t(
                                        "dashboard.myProjects.create.extra_form.count_people_input_label"
                                    )}
                                    value={elem.people_needed}
                                    onChange={event => changeExtraInputHandler(event.target.value, index, i, 'people_needed')}
                                />
                            </div>
                            <div className='col-span-2'>
                                <span className='block text-sm font-medium text-gray-700'>
                                    {t(
                                        "dashboard.myProjects.create.extra_form.how_many_now_input_label"
                                    )}{" "} <span className='text-red-500'> *</span>
                                </span>
                                <input
                                    type='number'
                                    id='Сколько их сейчас?'
                                    className={`bg-gray-50 text-gray-900 text-sm rounded-lg border outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5`}
                                    placeholder={t(
                                        "dashboard.myProjects.create.extra_form.how_many_now_input_label"
                                    )}
                                    value={elem.people_now}
                                    onChange={event => changeExtraInputHandler(event.target.value, index, i, 'people_now')}
                                />
                            </div>
                            <div className='col-span-1 w-full'>
                                <button
                                    type='button'
                                    className='bg-red-500 font-gilroy-bold text-white p-3.5 text-sm rounded focus:outline-none focus:shadow-outline transition-all w-full'
                                    onClick={() => deleteItemHandler(index, i)}
                                >
                                    {t("dashboard.myProjects.create.extra_form.delete_button_text")}
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className='w-full flex justify-end mt-2'>
                        <button
                            type='button'
                            className='bg-text-main_green font-gilroy-bold text-white py-3 px-[31px] text-sm rounded focus:outline-none focus:shadow-outline transition-all w-full md:w-auto'
                            onClick={() => addItemHandler(index, idx)}
                        >
                            {t("dashboard.myProjects.create.extra_form.add_button_text")}
                        </button>
                    </div>

                    <div className='flex flex-col md:flex-row md:space-x-4 mb-4'>
                        <div className='flex-1 mb-4 md:mb-0'>
                            <span className='block text-sm font-medium text-gray-700'>
                                {t(
                                    "dashboard.myProjects.create.extra_form.desired_position_input_label"
                                )}{" "} <span className='text-red-500'> *</span>
                            </span>
                            <input
                                type='text'
                                id='position'
                                name='positions'
                                className={`bg-gray-50 text-gray-900 text-sm rounded-lg border outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 ${!el.position ? 'border-red-700' : ''}`}
                                placeholder={t(
                                    "dashboard.myProjects.create.extra_form.desired_position_input_placeholder"
                                )}
                                defaultValue={el.position}
                                onChange={event => changeInputHandler(event.target.value, index, idx, 'position')}
                            />
                        </div>
                        <div className='flex-1'>
                            <span className='block text-sm font-medium text-gray-700'>
                                {t("dashboard.myProjects.create.extra_form.level_select_label")}{" "} <span className='text-red-500'> *</span>
                            </span>
                            <select
                                id='level'
                                name='levels'
                                className='block w-full bg-gray-50 h-12 border rounded-md outline-none p-2 focus:ring-blue-500 focus:border-blue-500'
                                onChange={event => changeInputHandler(Number(event.target.value), index, idx, 'level')}
                            >
                                {levels.map(el1 => (
                                    <option key={el1.value} value={el1.value} selected={el1.value == el.level}>{el1.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='mb-4'>
                        <span className='block text-sm font-medium text-gray-700'>
                            {t("dashboard.myProjects.create.extra_form.tasks_and_acheiv")}{" "} <span className='text-red-500'> *</span>
                        </span>
                        <textarea
                            id='tasks'
                            name='tasks'
                            rows='4'
                            className={`bg-gray-50 text-gray-900 text-sm rounded-lg border outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 ${!el.tasks ? 'border-red-700' : ''}`}
                            placeholder=''
                            defaultValue={el.tasks}
                            onChange={event => changeInputHandler(event.target.value, index, idx, 'tasks')}
                        ></textarea>
                    </div>

                    <div className='mb-4'>
                        <InputTag
                            title={t("dashboard.myProjects.create.extra_form.skills")}
                            name="Навыки"
                            ref={tag_ref}
                            enterClick={event => enterClick(event, index, idx)}
                            deleteItem={deleteTag}
                            item={el}
                            tags={el.tags}
                            index={index}
                            idx={idx}
                            clickHandler={(event) => clickHandler(event, index, idx)}
                        />
                    </div>

                    <div className='flex justify-end'>
                        <button
                            className='bg-custom-gray hover:bg-gray-600 transition-all text-white py-3 px-6 text-sm rounded focus:outline-none focus:shadow-outline border border-custom-gray font-gilroy-bold w-full md:w-auto'
                            onClick={() => deleteItem(index)}
                        >
                            {t("dashboard.myProjects.create.extra_form.remove_button_text")}
                        </button>
                    </div>
                </div>
            ))
        ))
    )
}

export default memo(Projectform);