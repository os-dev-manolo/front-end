import * as Yup from "yup";
import { PoliticalChain } from "../../../../shared/interfaces/IPoliticalChains";

const schema = Yup.object().shape({
    ano_criacao: Yup.date().required("Ano de criação é obrigatório"),
});

export const createPoliticalChain = async (
    payload: Partial<PoliticalChain>
) => {
    await schema.validate(payload, {
        abortEarly: false,
    });
};
