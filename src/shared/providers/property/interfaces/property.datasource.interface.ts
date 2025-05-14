import { IProperty } from "../../../interfaces/IProperties";
import IPropertyHistory from "./property-history.interface";

export default interface IPropertyDataSource {
    updateProperty(payload: UpdatePropertyArgs): Promise<IProperty>;
    updloadFiles(
        subscription: string,
        files: FormData
    ): Promise<{ fileName: string; destination: string }[]>;
    getPropertyHistory(
        geomId: number,
        propertyId?: number
    ): Promise<IPropertyHistory[]>;
}

export interface UpdatePropertyArgs {
    observation?: string;
    files?: string[];
    subscription?: string;
    propertyId?: number;
    geomId?: number;
    relatedBy: "geomSubscription" | "subscription";
}
