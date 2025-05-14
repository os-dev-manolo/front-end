import { IGbpStandardPageConfig } from "../../../shared/interfaces/IPageConfig";
import { PoliticalChain } from "../../../shared/interfaces/IPoliticalChains";

export const Config: IGbpStandardPageConfig<PoliticalChain> = {
    api: { path: "crud/correntes-politicas" },
    fields: {
        id: { label: "Código", fieldType: "number" },
        nome: { label: "Nome da corrente", fieldType: "text" },
        ano_criacao: { label: "Ano de criação", fieldType: "text" },
        criado_em: { label: "Criado em", fieldType: "date" },
        atualizado_em: { label: "Atualizado em", fieldType: "date" },
    },
};
