import { IGbpStandardPageConfig } from "../../../shared/interfaces/IPageConfig";
import { City } from "../../../shared/interfaces/IPoliticalChains";

export const Config: IGbpStandardPageConfig<City> = {
    api: { path: "crud/cidade" },
    fields: {
        id: { label: "Código", fieldType: "number" },
        cidade: { label: "Nome da cidade", fieldType: "text" },
        populacao: { label: "População", fieldType: "text" },
        resumo: { label: "Resumo", fieldType: "text" },
        prefeito: { label: "Prefeito", fieldType: "text" },
        ultima_visita: { label: "Ùltima Visita", fieldType: "text" },
        criado_em: { label: "Criado em", fieldType: "date" },
        atualizado_em: { label: "Atualizado em", fieldType: "date" },
    },
};
