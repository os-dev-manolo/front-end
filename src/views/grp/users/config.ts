import { IGrpStandardPageConfig } from "../../../shared/interfaces/IPageConfig";
import { IUser } from "../../../shared/interfaces/IUser";

export const Config: IGrpStandardPageConfig<Omit<IUser, "role">> = {
    api: {
        path: "users/manager",
    },
    fields: {
        id: { label: "Código", fieldType: "number" },
        usu_nome: { label: "Nome", fieldType: "text" },
        usu_email: { label: "Email", fieldType: "text" },
        usu_cpfcnpj: { label: "CPF/CNPJ", fieldType: "text" },
        usu_senha: { label: "Senha", fieldType: "password" },
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
        usu_telefone: { label: "Tel.", fieldType: "text" },
        usu_codigo_ativacao: { label: "Código de ativação", fieldType: "text" },
        usu_codigo_resetsenha: {
            label: "Código para reset de senha",
            fieldType: "text",
        },
        created_at: { label: "Criado em", fieldType: "date" },
        updated_at: { label: "Atualizado em", fieldType: "date" },
    },
};
