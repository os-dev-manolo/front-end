import IPropertyRepository from "../interfaces/property.repository.interface";

export default (repository: IPropertyRepository) =>
    async ({
        propertyId,
        subscription,
        files,
        observation,
    }: {
        subscription: string;
        propertyId: number;
        files?: string[];
        observation?: string;
    }) => {
        const property = await repository.updatePropertyRelatedToSubscription({
            subscription,
            propertyId,
            files,
            observation,
        });

        return property;
    };
