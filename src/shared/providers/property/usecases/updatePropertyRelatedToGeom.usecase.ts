import IPropertyRepository from "../interfaces/property.repository.interface";

export default (repository: IPropertyRepository) =>
    async ({
        geomId,
        subscription,
        files,
        observation,
    }: {
        geomId: number;
        subscription: string;
        files?: string[];
        observation?: string;
    }) => {
        const property = await repository.updatePropertyRelatedToGeom({
            geomId,
            files,
            observation,
            subscription,
        });

        return property;
    };
