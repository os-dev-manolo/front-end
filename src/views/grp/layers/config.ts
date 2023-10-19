import {
    IGrpStandardPageConfig,
    ISelect,
} from "../../../shared/interfaces/IPageConfig";
import { ILayers } from "../../../shared/interfaces/ILayers";

const selectConfig: Omit<ISelect, "label"> = {
    fieldType: "select",
    isClearable: true,
    options: [
        {
            label: "Habilitado",
            value: "true",
        },
        {
            label: "Desabilitado",
            value: "false",
        },
    ],
};

export const Config: IGrpStandardPageConfig<Omit<ILayers, "group">> = {
    api: { path: "layers-manager" },
    fields: {
        id: { label: "Código", fieldType: "number" },
        cam_desc_webgeo: {
            label: "Nome descritivo no webgeo",
            fieldType: "text",
        },
        cam_nome_geoserver: {
            label: "Nome registrado no geoserver",
            fieldType: "text",
        },
        cam_ordem: { label: "Ordem", fieldType: "number" },
        grpcam_id: {
            label: "Grupo",
            fieldType: "autocomplete",
            urlToFetch: "/layers-groups",
            isClearable: true,
            optionsLabel: "grpcam_nome",
        },
        styles: {
            label: "Estilos",
            fieldType: "autocomplete",
            urlToFetch: "/layers-styles",
            isClearable: true,
            optionsLabel: "cames_nome_geoserver",
        },
        cam_ativa_bci: {
            label: "BCI",
            ...selectConfig,
        },
        cam_ativa_consultaprevia: {
            label: "Consulta prévia",
            ...selectConfig,
        },
        cam_ativa_confrontante: {
            label: "Confrontante",
            ...selectConfig,
        },
        cam_ativa_login: {
            label: "Login",
            ...selectConfig,
        },
        cam_ativa_webgeo: {
            label: "Webgeo",
            ...selectConfig,
        },
        cam_cache: {
            label: "Cache",
            ...selectConfig,
        },
        created_at: { label: "Criado em", fieldType: "date" },
        updated_at: { label: "Atualizado em", fieldType: "date" },
    },
};
