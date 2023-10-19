import { semvApi } from "../axios/apis.service";

import { ILayers } from "../../interfaces/ILayers";
import { IPaginateApiResponse } from "../../interfaces/IPaginate";

export const LayersApiService = {
    async getLayers(
        searchParms?: string,
        relations?: string
    ): Promise<IPaginateApiResponse<ILayers[]>> {
        const { data } = await semvApi
            .get(`/layers?${searchParms}${relations}`)
            .catch(() => ({ data: { data: [] } }));

        return data;
    },
};
