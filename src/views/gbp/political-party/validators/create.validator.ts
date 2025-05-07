import * as Yup from "yup";
import { PoliticalParty } from "../../../../shared/interfaces/IPoliticalChains";

const schema = Yup.object().shape({
    nome: Yup.string().required("Nome é obrigatório"),
    cor_principal: Yup.string().required("Cor principal é obrigatório"),
    ano_criacao: Yup.string().required("Ano de criação é obrigatório"),
});

export const createPoliticalParty = async (
    payload: Partial<PoliticalParty>
) => {
    await schema.validate(payload, {
        abortEarly: false,
    });
};
