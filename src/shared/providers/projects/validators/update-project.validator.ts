import * as Yup from "yup";
import { UpdateProjectDto } from "../dtos/update-project.dto";

export default class UpdateProjectValidator {
    static schema = Yup.object().shape({
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

    static validate = async (issue: UpdateProjectDto) => {
        await UpdateProjectValidator.schema.validate(issue, {
            abortEarly: false,
        });
    };
}
