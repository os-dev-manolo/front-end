import { IProperty } from "../../../interfaces/IProperties";
import { IPropertyHistoryEntity } from "../entities/porperty-history.entity";

export default interface IPropertyRepository {
    updatePropertyRelatedToSubscription(payload: {
        observation?: string;
        files?: string[];
        subscription: string;
        propertyId: number;
    }): Promise<IProperty>;
    updatePropertyRelatedToGeom(payload: {
        observation?: string;
        files?: string[];
        geomId: number;
        subscription?: string;
    }): Promise<IProperty>;
    uploadFiles(
        files: File[],
        subscription: string
    ): Promise<{ fileName: string; destination: string }[]>;
    getHistory(
        geomId: number,
        propertyId?: number
    ): Promise<IPropertyHistoryEntity[]>;
}
