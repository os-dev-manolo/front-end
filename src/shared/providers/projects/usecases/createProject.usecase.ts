import { CreateProjectDto } from "../dtos/create-project.dto";
import { IProjectRepository } from "../interfaces/project.repository.interface";
import AttachmentsRepository from "../repositories/attachments.respository";
import CreateProjectValidator from "../validators/create-project.validator";

export default (
        projectRepository: IProjectRepository,
        attachmentsRepository: AttachmentsRepository
    ) =>
    async (form: CreateProjectDto) => {
        const { attachments, ...rest } = form;

        // payload para criação do projeto
        const data = {
            ...rest,
            number: Number(rest.number),
            value: Number(rest.value),
            counterpartValue:
                rest.counterpartValue != null
                    ? Number(rest.counterpartValue)
                    : undefined,
            cnpj: rest.cnpj.replace(/\D/gi, ""),
            zipcode: rest.zipcode.replace(/\D/gi, ""),
        };

        // valida os dados
        await CreateProjectValidator.validate(data);

        const attachmentsTokenWithDescritipon: {
            token: string;
            description: string;
        }[] = [];

        // upload dos anexos
        if (attachments.length > 0) {
            const files = attachments.map(
                (attachment) => attachment.attachment
            );
            const { success } = await attachmentsRepository.upload(files);

            // agrupa os arquivos pelo nome
            const keyByFileName = attachments?.reduce(
                (prev, curr) =>
                    Object.assign(prev, { [curr.attachment.name]: curr }),
                {} as Record<string, { description: string; attachment: File }>
            );
            // conecta o token retornado pelo uplado a descrição do arquivo
            success.forEach((uploadedFile) => {
                const fileDescription =
                    keyByFileName[uploadedFile.name].description;

                attachmentsTokenWithDescritipon.push({
                    token: uploadedFile.token as string,
                    description: fileDescription,
                });
            });
        }

        const { street, number, zipcode, ...issue } = data;

        const project = await projectRepository.create({
            ...issue,
            address: {
                number,
                street,
                zipcode,
            },
            attachments: attachmentsTokenWithDescritipon,
        });

        return project;
    };
