import { IGbpStandardPageConfig } from "../../../shared/interfaces/IPageConfig";
import { Official } from "../../../shared/interfaces/IPoliticalChains";

export const Config: IGbpStandardPageConfig<Official> = {
    api: { path: "crud/cargo-politico" },
    fields: {
        id: { label: "Código", fieldType: "number" },
        nome_cargo: { label: "Nome do cargo", fieldType: "text" },
        descricao_cargo: { label: "Descrição do cargo", fieldType: "text" },
        criado_em: { label: "Criado em", fieldType: "date" },
        atualizado_em: { label: "Atualizado em", fieldType: "date" },
    },
};
