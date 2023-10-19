import { IPropertyITBIEntity } from "../entities/property-itbi.entity";

export default interface IPropertyITBIRepository {
    getPropertyItbi(
        registration: string | number
    ): Promise<IPropertyITBIEntity[]>;
}
