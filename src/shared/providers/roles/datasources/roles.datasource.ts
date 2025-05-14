import { AxiosInstance } from "axios";

import { semvApi } from "../../../services/axios/apis.service";
import { IRoles } from "../interfaces/roles.interface";
import { IPaginateApiResponse } from "../../../interfaces/IPaginate";
import { IAllowedFeatures } from "../../../interfaces/IFeatures";

export class RolesDatasource {
    private readonly api: AxiosInstance;

    constructor(api: AxiosInstance = semvApi) {
        this.api = api;
    }

    async getAll(): Promise<IPaginateApiResponse<IRoles[]>> {
        const { data } = await this.api.get<IPaginateApiResponse<IRoles[]>>(
            "/roles"
        );

        return data;
    }

    async getAuthorization(roleId: number): Promise<IAllowedFeatures[]> {
        const { data } = await this.api.get<IAllowedFeatures[]>(
            `/roles/${roleId}/permissions`
        );

        return data;
    }
}

export default RolesDatasource;
