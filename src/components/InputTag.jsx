import React, { forwardRef } from 'react';
import { BiSend } from 'react-icons/bi';

const InputTag = forwardRef((props, ref) => {
    const { disabled = false, index, idx } = props;

    return (
        <div className="relative md:col-span-5">
            <label htmlFor={props.name} className="block text-[14px] text-gray-700 dark:text-white">
                {props.title} <span className='text-red-500'> *</span>
            </label>
            <div>
                {props.tags?.length > 0 && (
                    <div className="relative">
                        <div className={`flex flex-wrap w-full min-h-[34px] rounded-t-md border border-b-0 border-gray-300 px-2 py-[3px]  placeholder-gray-500 focus:z-10 focus:border-light-blue-500 focus:outline-none focus:ring-light-blue-500 text-xs`}>
                            {props.tags.map(tag => (
                                <span key={tag.id} className='border p-1 px-2 pr-4 rounded-md relative bg-blue-500 text-white'>
                                    {tag.name}
                                    <span className='w-3 absolute top-0 right-0 cursor-pointer' onClick={() => props.deleteItem(index, idx, tag.id)}>&times;</span>
                                    {/* <XMarkIcon className='w-3 absolute top-0 right-0 cursor-pointer' onClick={() => props.deleteItem(tag.id)} /> */}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
                <div className='relative'>
                    <input
                        id={props.name}
                        name={props.name}
                        type="text"
                        autoComplete="current-text"
                        className={`relative block w-full appearance-none rounded-b-md border border-gray-300 px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-light-blue-800 focus:outline-none focus:ring-light-blue-500 text-xs pr-8`}
                        placeholder={props.title}
                        onKeyDown={props.enterClick}
                        ref={ref}
                        disabled={disabled}
                        autoFocus
                    />
                    <span className='absolute top-2 right-2 bottom-0 m-auto z-20' onClick={props.clickHandler}>
                        <BiSend className='cursor-pointer text-[20px] text-cyan-700' />
                    </span>
                </div>
            </div>
        </div>
    )
})

export default React.memo(InputTag);