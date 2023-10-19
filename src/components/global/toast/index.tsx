import React from "react";

import {
    ToastContainer,
    toast,
    ToastOptions,
    Id,
    ToastContent,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface PropsToast {
    type?: "info" | "success" | "error" | "warn";
    message?: ToastContent;
    options?: ToastOptions;
}

export const closeToast = (id?: Id) => toast.dismiss(id);

export const showToast = ({ type, message, options }: PropsToast) => {
    switch (type) {
        case "success":
            return toast.success(message, options);
        case "warn":
            return toast.warn(message, options);
        case "error":
            return toast.error(message, options);
        default:
            return toast.info(message, options);
    }
};

export function ToastAnimated() {
    return <ToastContainer />;
}
