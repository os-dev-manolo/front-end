import { AxiosInstance } from "axios";

import { semvApi } from "../../../services/axios/apis.service";
import { IPaginateApiResponse } from "../../../interfaces/IPaginate";
import { ILayersGroup } from "../interfaces/layer-group";

export class LayersGroupsDatasource {
    private readonly api: AxiosInstance;

    constructor(api: AxiosInstance = semvApi) {
        this.api = api;
    }

    async getAll(): Promise<IPaginateApiResponse<ILayersGroup[]>> {
        const { data } = await this.api.get<
            IPaginateApiResponse<ILayersGroup[]>
        >("/layers-groups");

        return data;
    }
}

export default LayersGroupsDatasource;
