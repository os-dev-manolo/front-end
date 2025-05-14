import * as Yup from "yup";

import { IRegisterRequest } from "../../../../../../shared/interfaces/IUser";

import { Regex } from "../../../../../../shared/utils/regex";

const schema = Yup.object().shape({
    email: Yup.string()
        .email("Formato de email inválido")
        .required("Email obrigatório"),
    password: Yup.string().required("Senha obrigatória"),
    passwordConfimartion: Yup.string()
        .oneOf([Yup.ref("password"), null], "Senhas divergentes")
        .required("Confirmação de senha obrigatória"),
    name: Yup.string()
        .test({
            test(value) {
                return value ? value.trim().includes(" ") : false;
            },
            message: "Precisa conter nome e sobrenome",
        })
        .required("Nome obrigatório"),
    document: Yup.string()
        .matches(Regex.CPF_CNPJ, "CPF inválido")
        .required("CPF obrigatório"),
    phone: Yup.string(),
    telephone: Yup.string()
        .matches(Regex.PHONE, "Celular inválido")
        .required("Celular obrigatório"),
    role: Yup.number().required("Grupo inválido"),
});

export const signUpValidator = async ({
    document,
    email,
    role,
    name,
    password,
    telephone,
    passwordConfimartion,
}: IRegisterRequest) => {
    await schema.validate(
        {
            email,
            name,
            document,
            telephone,
            password,
            passwordConfimartion,
            role,
        },
        {
            abortEarly: false,
        }
    );
};
