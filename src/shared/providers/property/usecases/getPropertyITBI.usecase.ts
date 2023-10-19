import IPropertyITBIRepository from "../interfaces/property-itbi.repository.interface";

export default (repository: IPropertyITBIRepository) =>
    async (registration: number | string) => {
        const itbis = await repository.getPropertyItbi(registration);

        return itbis;
    };
