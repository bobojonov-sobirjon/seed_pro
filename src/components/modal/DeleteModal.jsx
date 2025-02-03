import React, { Fragment, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, Transition } from '@headlessui/react';

function DeleteItem(props) {
    const { account = false } = props;
    const { t } = useTranslation();
    const cancelButtonRef = useRef(null);

    return (
        <Transition.Root show={props?.open} as={Fragment}>
            <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={props.closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity m-auto" style={{ maxWidth: "1650px" }} />
                </Transition.Child>
                <div className="fixed inset-0 z-10 ">
                    <div className="flex justify-center p-4 text-cente items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative w-full sm:w-96 transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 shadow-xl transition-all sm:my-8 p-1 sm:p-3">
                                <div className="flex items-start">
                                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 mx-0 sm:h-10 sm:w-10 ">
                                        {/* <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" /> */}
                                    </div>
                                    <div className="mt-0 ml-4 text-left text-txt_color-slate">
                                        <Dialog.Title as="h3" className="text-sm sm:text-base font-normal leading-2">
                                            {t("extraComponents.deleteModal.delete_text")}{" "}
                                            {account
                                                ? t("extraComponents.deleteModal.delete_type_one")
                                                : t("extraComponents.deleteModal.delete_type_two")}
                                        </Dialog.Title>
                                        <div className="mt-0 sm:mt-2">
                                            <p className="text-xs text-gray-500">
                                                {t("extraComponents.deleteModal.confirm_text")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 flex content-end flex-row-reverse gap-1">
                                    <button
                                        type="button"
                                        className={`bg-red-700 hover:bg-red-600 focus:ring-red-600 text-white text-[12px] px-2 py-1 rounded-md`}
                                        onClick={props.deleteItemHandler}
                                    >
                                        {t("extraComponents.deleteModal.delete_button_text")}
                                    </button>
                                    <button
                                        type="button"
                                        className={`bg-gray-700 hover:bg-gray-600 focus:ring-gray-600 text-white text-[12px] px-2 py-1 rounded-md`}
                                        onClick={props.closeModal}
                                    >
                                        {t("extraComponents.deleteModal.cancel_button_text")}
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default React.memo(DeleteItem);