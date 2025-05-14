import * as Yup from "yup";
import { LegalPerson } from "../../../../../shared/interfaces/ILegalPerson";

const schema = Yup.object().shape({
    cnpj: Yup.string().required("CNPJ é obrigatório"),
});

export const createPersonpj= async (payload: Partial<LegalPerson>) => {
    await schema.validate(payload, {
        abortEarly: false,
    });
};
