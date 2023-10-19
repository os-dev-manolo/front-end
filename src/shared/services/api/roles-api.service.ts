import { IFormatedGrantedAccess } from "../../../components/page-releated/access-control/tabs/interfaces";
import { IAllowedFeatures } from "../../interfaces/IFeatures";
import { IPaginateApiResponse } from "../../interfaces/IPaginate";
import { IRolesResponse } from "../../interfaces/IRoles";
import { semvApi } from "../axios/apis.service";

export const RolesApiService = {
    async get(searchParms?: string, relations?: string) {
        const { data } = await semvApi.get<
            IPaginateApiResponse<IRolesResponse[]>
        >(
            relations
                ? `/roles?${searchParms}${relations}`
                : `/roles?${searchParms}`
        );

        return data;
    },
    async getPermissions(roleId: number) {
        const { data } = await semvApi.get<IAllowedFeatures[]>(
            `/roles/${roleId}/permissions`
        );

        return data;
    },
    async createPermissions(roleId: number, payload: IFormatedGrantedAccess[]) {
        const { data } = await semvApi.post(
            `/roles/${roleId}/permissions`,
            payload
        );

        return data;
    },
};
