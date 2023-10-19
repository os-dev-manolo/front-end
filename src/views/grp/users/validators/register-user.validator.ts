import * as Yup from "yup";
import { IUser } from "../../../../shared/interfaces/IUser";
import { Regex } from "../../../../shared/utils/regex";

const schema = Yup.object().shape({
    usu_nome: Yup.string()
        .test({
            test(value) {
                return value ? value.trim().includes(" ") : false;
            },
            message: "Precisa conter nome e sobrenome",
        })
        .required("Nome obrigatório"),
    usu_senha: Yup.string().required("Senha obrigatória"),
    role_id: Yup.number()
        .typeError("Selecione um grupo válido")
        .required("Grupo obrigatório"),
    usu_ativo: Yup.bool().optional().typeError("Selecione um status válido"),
    usu_email: Yup.string()
        .email("Formato de email inválido")
        .required("Email obrigatório"),
    usu_telefone: Yup.string()
        .matches(Regex.PHONE, "Celular inválido")
        .required("Celular obrigatório"),
    usu_cpfcnpj: Yup.string()
        .matches(Regex.CPF_CNPJ, "CPF inválido")
        .required("CPF obrigatório"),
});

export const registerUserValidator = async (payload: Partial<IUser>) => {
    await schema.validate(payload, {
        abortEarly: false,
    });
};
