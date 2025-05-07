import * as Yup from "yup";
import { IAmendmentsResponse } from "../../../../shared/interfaces/IAmendments";

const schema = Yup.object().shape({
    contato: Yup.string().required("contato obrigatória"),
});

export const createAmendmentsValidator = async (
    payload: Partial<IAmendmentsResponse>
) => {
    await schema.validate(payload, {
        abortEarly: false,
    });
};
