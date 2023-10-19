import { IGrpStandardPageConfig } from "../../../shared/interfaces/IPageConfig";
import { IRolesResponse } from "../../../shared/interfaces/IRoles";

export const Config: IGrpStandardPageConfig<IRolesResponse> = {
    api: { path: "roles" },
    fields: {
        id: { label: "Código", fieldType: "number" },
        role_descricao: { label: "Descrição", fieldType: "text" },
        created_at: { label: "Criado em", fieldType: "date" },
        updated_at: { label: "Atualizado em", fieldType: "date" },
    },
};
