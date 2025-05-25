import * as Yup from "yup";
import { IAmendmentsApiResponse } from "../../../../shared/interfaces/IAmendmentsApi";

// const moneyValidation = Yup.number()
//     .typeError("Deve ser um número")
//     .test(
//         "is-decimal-precision",
//         "Máximo 13 dígitos antes da vírgula e 2 após",
//         (value) => {
//             if (value === undefined || value === null) return true;
//             const [intPart, decimalPart] = value.toString().split(".");
//             const precision = intPart.length + (decimalPart?.length || 0);
//             const scale = decimalPart?.length || 0;
//             return precision <= 15 && scale <= 2;
//         }
//     );
const schema = Yup.object().shape({
    valor_empenhado: Yup.string().required("valor_empenhado obrigatório"),
    valor_liquidado: Yup.string().required("valor_liquidado obrigatório"),
    valor_pago: Yup.string().required("valor_pago obrigatório"),
    valor_resto_inscrito: Yup.string().required(
        "valor_resto_inscrito obrigatório"
    ),
    valor_resto_cancelado: Yup.string().required(
        "valor_resto_cancelado obrigatório"
    ),
    valor_resto_pago: Yup.string().required("valor_resto_pago obrigatório"),
});

export const createAmendmentsApiValidator = async (
    payload: Partial<IAmendmentsApiResponse>
) => {
    await schema.validate(payload, {
        abortEarly: false,
    });
};
