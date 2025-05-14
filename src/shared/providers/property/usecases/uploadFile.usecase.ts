import IPropertyRepository from "../interfaces/property.repository.interface";

export default (repository: IPropertyRepository) =>
    async (files: File[], subscription: string) => {
        const uploadFiles = await repository.uploadFiles(files, subscription);

        return uploadFiles.map((file) => file.destination);
    };
