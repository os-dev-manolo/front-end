import { IPropertyITBI } from "./property-itbi.interface";

export default interface IPropertyITBIDataSource {
    getPropertyItbi(registration: string | number): Promise<IPropertyITBI[]>;
}
