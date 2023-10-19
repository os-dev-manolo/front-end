import { semvApi } from "../axios/apis.service";

import { IFeatures } from "../../interfaces/IFeatures";

export const FeaturesApiService = {
    async get(): Promise<IFeatures[]> {
        const { data } = await semvApi.get("/features");
        return data;
    },
};
