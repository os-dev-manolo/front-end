import { IGbpStandardPageConfig } from "../../../shared/interfaces/IPageConfig";
import { PoliticalParty } from "../../../shared/interfaces/IPoliticalChains";

export const Config: IGbpStandardPageConfig<PoliticalParty> = {
    api: { path: "crud/partidos-politicos" },
    fields: {
        id: { label: "Código", fieldType: "number" },
        nome: { label: "Nome", fieldType: "text" },
        sigla: { label: "Sigla", fieldType: "text" },
        cor_principal: { label: "Cor principal", fieldType: "text" },
        cor_secundaria: { label: "Cor secundária", fieldType: "text" },
        ano_criacao: { label: "Ano de criação", fieldType: "text" },
        criado_em: { label: "Criado em", fieldType: "date" },
        atualizado_em: { label: "Atualizado em", fieldType: "date" },
        id_coligação: { label: "Id coligação", fieldType: "number" },
        coligacao: {
            label: "coligacao",
            fieldType: "relation",
            fields: [
                {
                    label: "Nome Coligação",
                    fieldType: "text",
                    key: "nome",
                },
            ],
        },
    },
};
