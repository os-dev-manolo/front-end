import { AxiosInstance } from "axios";

import { semvApi } from "../../../services/axios/apis.service";
import { IPaginateApiResponse } from "../../../interfaces/IPaginate";
import { ILayer } from "../interfaces/layer.interface";

export class LayersManagerDatasource {
    private readonly api: AxiosInstance;

    constructor(api: AxiosInstance = semvApi) {
        this.api = api;
    }

    async getAll(): Promise<IPaginateApiResponse<ILayer[]>> {
        const { data } = await this.api.get<IPaginateApiResponse<ILayer[]>>(
            "/layers-manager"
        );

        return data;
    }
}

export default LayersManagerDatasource;
