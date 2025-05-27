import * as Yup from "yup";
import { Person } from "../../../../../shared/interfaces/IPerson";

function isValidCPF(cpf: string): boolean {
    const cleanCPF = cpf.replace(/[^\d]+/g, "");

    if (cleanCPF.length !== 11 || /^(\d)\1{10}$/.test(cleanCPF)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i += 1) {
        sum += parseInt(cleanCPF.charAt(i), 10) * (10 - i);
    }

    let rev = 11 - (sum % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cleanCPF.charAt(9), 10)) return false;

    sum = 0;
    for (let i = 0; i < 10; i += 1) {
        sum += parseInt(cleanCPF.charAt(i), 10) * (11 - i);
    }

    rev = 11 - (sum % 11);
    if (rev === 10 || rev === 11) rev = 0;

    return rev === parseInt(cleanCPF.charAt(10), 10);
}

const schema = Yup.object().shape({
    nome: Yup.string().required("Nome é obrigatório"),
    nascimento: Yup.string().required("Nascimento é obrigatório"),
    sexo: Yup.string().required("Sexo é obrigatório"),
    telefone_tipo: Yup.string().required("Tipo do telefone é obrigatório"),
    telefone_principal: Yup.string().required("Telefone é obrigatório"),

    email_pessoal: Yup.string()
        .required("Email é obrigatório")
        .email("E-mail inválido"),
    email_comercial: Yup.string().email("E-mail inválido"),
    cpf: Yup.string()
        .required("CPF é obrigatório")
        .test("is-valid-cpf", "CPF inválido", (value) =>
            value ? isValidCPF(value) : false
        ),

    relacao_politica: Yup.string().required(
        "Relação com a política obrigatório"
    ),
    cargo_publico: Yup.string().required("Cargo público é obrigatório"),
});

export const createPerson = async (payload: Partial<Person>) => {
    await schema.validate(payload, {
        abortEarly: false,
    });
};
