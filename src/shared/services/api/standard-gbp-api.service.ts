import { SearchParamsEnum } from "../../enums/search-params.enum";
import { IPaginateApiResponse } from "../../interfaces/IPaginate";
import { semvApi } from "../axios/apis.service";

const formatSearchParams = (
    searchParams: Partial<Record<SearchParamsEnum, unknown>>
): string => {
    const newSearchParams = { ...searchParams };
    if (!searchParams.limit) newSearchParams.limit = 20;
    if (!searchParams.offset) newSearchParams.offset = 0;
    if (!searchParams.orderBy) newSearchParams.orderBy = "ASC:id";

    return Object.entries(newSearchParams).reduce((acc, [key, value]) => {
        const newAcc = `${acc}${key}=${value}&`;
        return newAcc;
    }, "");
};

export interface IGetArgs {
    path: string;
    params: Partial<Record<SearchParamsEnum, unknown>>;
    relations?: string[];
}

interface ICreateArgs {
    path: string;
    payload: unknown;
}

export const StandardGbpApiService = {
    async get<T>({ params, path, relations }: IGetArgs) {
        const searchParms = formatSearchParams(params);
        console.log(`/${path}?${searchParms}`);
        const { data } = await semvApi.get<IPaginateApiResponse<T[]>>(
            relations
                ? `/${path}?${searchParms}relations=${relations.join(",")}`
                : `/${path}?${searchParms}`
        );

        return data;
    },
    async readOne({
        path,
        id,
    }: Omit<IGetArgs, "params" | "relations"> & { id: string | number }) {
        const { data } = await semvApi.get(`/${path}/${id}`);
        return data;
    },
    async create({ path, payload }: ICreateArgs) {
        console.log(`/${path}`, payload);
        const { data } = await semvApi.post(`/${path}`, payload);

        return data;
    },
    async update({ path, id, payload }: ICreateArgs & { id: string | number }) {
        const { data } = await semvApi.put(`/${path}/${id}`, payload);

        return data;
    },
    async delete({
        path,
        id,
    }: Pick<ICreateArgs, "path"> & { id: string | number }) {
        const { data } = await semvApi.delete(`/${path}/${id}`);

        return data;
    },
};
