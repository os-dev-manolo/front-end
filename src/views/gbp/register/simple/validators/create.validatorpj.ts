import * as Yup from "yup";
import { LegalPerson } from "../../../../../shared/interfaces/ILegalPerson";

const isValidCNPJ = (cnpj: string): boolean => {
    const cleaned = cnpj.replace(/[^\d]+/g, "");

    if (cleaned.length !== 14 || /^(\d)\1+$/.test(cleaned)) {
        return false;
    }

    const calculateCheckDigit = (
        digits: string,
        multipliers: number[]
    ): number => {
        const sum = digits
            .split("")
            .reduce(
                (acc, digit, index) => acc + Number(digit) * multipliers[index],
                0
            );
        const remainder = sum % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    };

    const base = cleaned.slice(0, 12);
    const firstCheckDigit = calculateCheckDigit(
        base,
        [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    );
    const secondCheckDigit = calculateCheckDigit(
        base + firstCheckDigit,
        [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    );

    return cleaned.endsWith(`${firstCheckDigit}${secondCheckDigit}`);
};

const schema = Yup.object().shape({
    razao_social: Yup.string().required("Razão é obrigatório"),
    cnpj: Yup.string()
        .required("CNPJ é obrigatório")
        .test("is-valid-cnpj", "CNPJ inválido", (value) =>
            value ? isValidCNPJ(value) : false
        ),
    natureza_juridica: Yup.string().required("Nature Jurídica"),
    email: Yup.string()
        .required("E-mail é obrigatório")
        .email("E-mail inválido"),
    email_comercial: Yup.string().email("E-mail inválido"),
    telefone_principal: Yup.string().required("Telefone é obrigatório"),
    possui_representante: Yup.string().required("Possui representante?"),
    relacao_institucional: Yup.string().required("Relação Institucional"),
});

export const createPersonpj = async (payload: Partial<LegalPerson>) => {
    await schema.validate(payload, {
        abortEarly: false,
    });
};
