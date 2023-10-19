import { UpdateProjectDto } from "../dtos/update-project.dto";
import { IProjectRepository } from "../interfaces/project.repository.interface";
import UpdateProjectValidator from "../validators/update-project.validator";

export default (projectRepository: IProjectRepository) =>
    async (id: number, form: UpdateProjectDto) => {
        // payload para criação do projeto
        const data = {
            ...form,
            number: Number(form.number),
            value: Number(form.value),
            counterpartValue:
                form.counterpartValue != null
                    ? Number(form.counterpartValue)
                    : undefined,
            cnpj: form.cnpj.replace(/\D/gi, ""),
            zipcode: form.zipcode.replace(/\D/gi, ""),
        };
        // valida os dados
        await UpdateProjectValidator.validate(data);

        const { street, number, zipcode, ...issue } = data;

        const project = await projectRepository.update(id, {
            ...issue,
            address: {
                number,
                street,
                zipcode,
            },
        });

        return project;
    };
