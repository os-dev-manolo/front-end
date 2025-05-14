import IPropertyRepository from "../interfaces/property.repository.interface";

export default (repository: IPropertyRepository) =>
    async (geomId: number, propertyId?: number) => {
        const history = await repository.getHistory(geomId, propertyId);

        return history;
    };
