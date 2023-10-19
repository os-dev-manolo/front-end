import { IProperty } from "../../../interfaces/IProperties";
import PropertyDatasource from "../datasource/property.datasource";
import PropertyHistory, {
    IPropertyHistoryEntity,
} from "../entities/porperty-history.entity";
import IPropertyDataSource from "../interfaces/property.datasource.interface";
import IPropertyRepository from "../interfaces/property.repository.interface";

class PropertyRepository implements IPropertyRepository {
    private readonly datasource: IPropertyDataSource;

    constructor(datasource: IPropertyDataSource = new PropertyDatasource()) {
        this.datasource = datasource;
    }

    async updatePropertyRelatedToGeom(payload: {
        observation?: string;
        files?: string[];
        subscription?: string;
        geomId: number;
    }): Promise<IProperty> {
        const property = await this.datasource.updateProperty({
            ...payload,
            relatedBy: "geomSubscription",
        });

        return property;
    }

    async updatePropertyRelatedToSubscription(payload: {
        observation?: string;
        propertyId: number;
        files?: string[];
        subscription: string;
    }): Promise<IProperty> {
        const property = await this.datasource.updateProperty({
            ...payload,
            relatedBy: "subscription",
        });

        return property;
    }

    async uploadFiles(
        files: File[],
        subscription: string
    ): Promise<{ fileName: string; destination: string }[]> {
        const filesForm = new FormData();

        files.forEach((file) => filesForm.append("files", file));

        const uploadedFiles = await this.datasource.updloadFiles(
            subscription,
            filesForm
        );

        return uploadedFiles;
    }

    async getHistory(
        geomId: number,
        propertyId?: number
    ): Promise<IPropertyHistoryEntity[]> {
        const response = await this.datasource.getPropertyHistory(
            geomId,
            propertyId
        );

        return response.map((history) => PropertyHistory(history));
    }
}

export default PropertyRepository;
