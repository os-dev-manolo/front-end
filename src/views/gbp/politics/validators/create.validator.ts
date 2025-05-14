import * as Yup from "yup";
import { Politic } from "../../../../shared/interfaces/IPoliticalChains";

const schema = Yup.object().shape({
    // id_filiacao: Yup.string().required("Campo obrigatório"),
});

export const createPolitic = async (payload: Partial<Politic>) => {
    await schema.validate(payload, {
        abortEarly: false,
    });
};
