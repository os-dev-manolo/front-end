import { IGbpStandardPageConfig } from "../../../shared/interfaces/IPageConfig";
import { Politic } from "../../../shared/interfaces/IPoliticalChains";

export const Config: IGbpStandardPageConfig<Politic> = {
    api: { path: "crud/politico" },
    fields: {
        id: { label: "Código", fieldType: "number" },
        criado_em: { label: "Criado em", fieldType: "date" },
        atualizado_em: { label: "Atualizado em", fieldType: "date" },
        id_pessoa_fisica: { label: "Id filiacao", fieldType: "number" },
        id_partido: { label: "Id filiacao", fieldType: "number" },
        cargo_politico: { label: "Cargo Político", fieldType: "text" },
        partido: {
            label: "Partido",
            fieldType: "relation",
            fields: [
                {
                    label: "Nome Coligação",
                    fieldType: "text",
                    key: "nome",
                },
            ],
        },
        pessoa: {
            label: "Pessoa",
            fieldType: "relation",
            fields: [
                {
                    label: "Nome",
                    fieldType: "text",
                    key: "nome",
                },
                {
                    label: "Nascimento",
                    fieldType: "date",
                    key: "nascimento",
                },
            ],
        },
    },
};
