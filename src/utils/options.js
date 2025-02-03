import { toast } from "react-toastify";
import { toastContent } from "../components/toast/toast";

export const getToast = (val) => {
    toast.success(val, toastContent);
}

export const getToastWarn = (val) => {
    toast.warn(val, toastContent);
}

export const getToastError = (val) => {
    toast.error(val, toastContent);
}

export const errorHandler = (error) => {
    if (typeof error?.response?.data !== "string") {
        let keys = Object.keys(error?.response?.data);
        let values = Object.values(error?.response?.data);
        if (values?.length > 0) {
            values.forEach((item, index) => {
                if (item?.length > 0 && Array.isArray(item)) {
                    item.map(el => {
                        getToastError(keys[index] + ": " + el);
                    })
                } else {
                    getToastError(keys[index] + ": " + item);
                }
            })
        }
    } else getToastWarn("На сервере произошла ошибка.");
}

export const levels = [
    { value: 1, name: "Junior" },
    { value: 2, name: "Middle" },
    { value: 3, name: "Senior" },
];