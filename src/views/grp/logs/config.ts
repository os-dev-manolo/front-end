import { IGrpStandardPageConfig } from "../../../shared/interfaces/IPageConfig";
import { ILogsResponse } from "../../../shared/interfaces/ILogs";

export const Config: IGrpStandardPageConfig<Omit<ILogsResponse, "user">> = {
    api: { path: "logs" },
    fields: {
        id: { label: "Código", fieldType: "number" },
        log_message: {
            label: "Ação",
            fieldType: "text",
        },
        system: {
            label: "Sistema",
            fieldType: "select",
            isClearable: true,
            options: [
                {
                    label: "Webgeo",
                    value: "webgeo",
                },
                {
                    label: "Grp",
                    value: "grp",
                },
                {
                    label: "Gbp",
                    value: "gbp",
                },
            ],
        },
        usr_id: {
            label: "Realizado por",
            fieldType: "autocomplete",
            urlToFetch: "/users",
            isClearable: true,
            optionsLabel: "usu_nome",
        },
        usr_ip: { label: "IP", fieldType: "text" },
        created_at: { label: "Criado em", fieldType: "date" },
        updated_at: { label: "Atualizado em", fieldType: "date" },
    },
};
