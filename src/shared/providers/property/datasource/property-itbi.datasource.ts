import { AxiosInstance } from "axios";
import { IPaginateApiResponse } from "../../../interfaces/IPaginate";
import { semvApi } from "../../../services/axios/apis.service";
import IPropertyITBIDataSource from "../interfaces/property-itbi.datasource.interface";
import { IPropertyITBI } from "../interfaces/property-itbi.interface";

class PropertyITBIDatasource implements IPropertyITBIDataSource {
    private readonly api: AxiosInstance;

    constructor(api: AxiosInstance = semvApi) {
        this.api = api;
    }

    async getPropertyItbi(
        registration: number | string
    ): Promise<IPropertyITBI[]> {
        const {
            data: { data },
        } = await this.api.get<IPaginateApiResponse<IPropertyITBI[]>>(
            `/properties/itbi?where=${JSON.stringify({
                codigo_cadastro: registration,
            })}`
        );

        return data;
    }
}

export default PropertyITBIDatasource;
