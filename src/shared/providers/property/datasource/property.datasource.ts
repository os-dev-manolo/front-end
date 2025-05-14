import { AxiosInstance } from "axios";
import { IPaginateApiResponse } from "../../../interfaces/IPaginate";
import { IProperty } from "../../../interfaces/IProperties";
import { semvApi } from "../../../services/axios/apis.service";
import IPropertyHistory from "../interfaces/property-history.interface";
import IPropertyDataSource, {
    UpdatePropertyArgs,
} from "../interfaces/property.datasource.interface";

class PropertyDatasource implements IPropertyDataSource {
    private readonly api: AxiosInstance;

    constructor(api: AxiosInstance = semvApi) {
        this.api = api;
    }

    async updateProperty({
        relatedBy,
        subscription,
        files,
        geomId,
        propertyId,
        observation,
    }: UpdatePropertyArgs): Promise<IProperty> {
        const payload = {
            li_observacao: observation,
            li_anexos: files,
            inscricao: subscription,
            lote_id: geomId,
            tbimv_id: propertyId,
            li_related_by: relatedBy,
        };

        const { data: propertie } = await this.api.patch(
            `/properties`,
            payload
        );

        return propertie;
    }

    async updloadFiles(
        subscription: string,
        files: FormData
    ): Promise<{ fileName: string; destination: string }[]> {
        const { data } = await this.api.post(
            `/properties/${subscription}/upload`,
            files,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );

        return data.data;
    }

    async getPropertyHistory(
        geomId: number,
        propertyId?: number
    ): Promise<IPropertyHistory[]> {
        let baseUrl = `/properties/history?geomId=${geomId}&relations=user`;

        if (propertyId) {
            baseUrl += `&propertyId=${propertyId}`;
        }
        const {
            data: { data },
        } = await this.api.get<IPaginateApiResponse<IPropertyHistory[]>>(
            baseUrl
        );

        return data;
    }
}

export default PropertyDatasource;
