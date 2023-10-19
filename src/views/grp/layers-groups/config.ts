import { IGrpStandardPageConfig } from "../../../shared/interfaces/IPageConfig";
import { ILayersGroups } from "../../../shared/interfaces/ILayers";

export const Config: IGrpStandardPageConfig<ILayersGroups> = {
    api: { path: "layers-groups" },
    fields: {
        id: { label: "Código", fieldType: "number" },
        grpcam_nome: {
            label: "Nome do grupo",
            fieldType: "text",
        },
        grpcam_ordem: { label: "Ordem", fieldType: "number" },
        created_at: { label: "Criado em", fieldType: "date" },
        updated_at: { label: "Atualizado em", fieldType: "date" },
    },
};
