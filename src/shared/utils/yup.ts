import * as Yup from "yup";
import { showToast } from "../../components/global/toast";

export function yupValidation(err: unknown): { [key: string]: string } {
    const validationErrors: { [key: string]: string } = {};

    if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
            if (error.path) validationErrors[error.path] = error.message;
        });

        showToast({ type: "error", message: "Formulário inválido" });
    }

    return validationErrors;
}
