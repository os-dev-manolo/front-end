import * as Yup from "yup";
import { Official } from "../../../../shared/interfaces/IPoliticalChains";

const schema = Yup.object().shape({
    // id_filiacao: Yup.string().required("Campo obrigatório"),
});

export const createOfficial = async (payload: Partial<Official>) => {
    await schema.validate(payload, {
        abortEarly: false,
    });
};
