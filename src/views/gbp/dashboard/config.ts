import { IGrpStandardPageConfig } from "../../../shared/interfaces/IPageConfig";
import { IUser } from "../../../shared/interfaces/IUser";

export const Config: IGrpStandardPageConfig<
    Pick<
        IUser,
        "id" | "usu_nome" | "usu_email" | "usu_ativo" | "role_id" | "created_at"
    >
> = {
    api: { path: "path" },
    fields: {
        id: { label: "Código", fieldType: "number" },
        usu_nome: { label: "Nome", fieldType: "text" },
        usu_email: { label: "Email", fieldType: "text" },
        usu_ativo: {
            label: "Ativo",
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
        },
        role_id: {
            label: "Grupo",
            fieldType: "autocomplete",
            urlToFetch: "/roles",
            optionsLabel: "role_descricao",
            isClearable: true,
        },
        created_at: { label: "Criado em", fieldType: "date" },
    },
};
