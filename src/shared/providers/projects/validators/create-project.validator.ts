import * as Yup from "yup";

export default class CreateProjectValidator {
    static schema = Yup.object().shape({
        tracker: Yup.number().required("Tipo da obra obrigatório."),
        work: Yup.string().required("Nome da obra obrigatório."),
        street: Yup.string().required("Rua obrigatória."),
        number: Yup.string().required("Número predial obrigatório."),
        zipcode: Yup.string().length(8).required("Cep obrigatório."),
        secretary: Yup.string().required("Secretaria obrigatória."),
        cnpj: Yup.string().length(14).required("CNPJ obrigatório."),
        ressource: Yup.string().required("Fonte de recurso obrigatório."),
        value: Yup.number().required("Valor estimado obrigatório."),
        counterpartValue: Yup.number(),
        description: Yup.string().required("Descrição obrigatória."),
    });

    static validate = async (issue: {
        tracker: number;
        work: string;
        street: string;
        number: number;
        zipcode: string;
        secretary: string;
        cnpj: string;
        ressource: string;
        value: number;
        description: string;
        counterpartValue?: number;
    }) => {
        await CreateProjectValidator.schema.validate(issue, {
            abortEarly: false,
        });
    };
}
