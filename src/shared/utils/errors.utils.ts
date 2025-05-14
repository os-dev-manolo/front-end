import { showToast } from "../../components/global/toast";
import { ApiError } from "../errors/ApiError";

export const ApiErrorHandler = (err: unknown, toastType?: "error" | "warn") => {
    if (err instanceof ApiError) {
        showToast({ message: err.message, type: toastType || "error" });
    }
};
