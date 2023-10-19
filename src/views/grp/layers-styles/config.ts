import { IGrpStandardPageConfig } from "../../../shared/interfaces/IPageConfig";
import { ILayersStyles } from "../../../shared/interfaces/ILayers";

export const Config: IGrpStandardPageConfig<Omit<ILayersStyles, "layers">> = {
    api: { path: "layers-styles" },
    fields: {
        id: { label: "Código", fieldType: "number" },
        cames_nome: {
            label: "Nome do estilo",
            fieldType: "text",
        },
        cames_nome_geoserver: {
            label: "Nome do estilo geoserver",
            fieldType: "text",
        },
        cam_id: {
            label: "Camada relacionada",
            fieldType: "autocomplete",
            urlToFetch: "/layers-manager",
            isClearable: true,
            optionsLabel: "cam_nome_geoserver",
        },
        created_at: { label: "Criado em", fieldType: "date" },
        updated_at: { label: "Atualizado em", fieldType: "date" },
    },
};
