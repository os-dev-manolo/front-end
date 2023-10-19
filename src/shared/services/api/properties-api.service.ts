import {
    IBCIResponse,
    IConsultaPrevaiResponse as IConsultaPreviaResponse,
} from "../../interfaces/IBCI";
import { IPaginateApiResponse } from "../../interfaces/IPaginate";
import { IProperty } from "../../interfaces/IProperties";
import { ICreateSearchParams } from "../../interfaces/ISearchParams";
import { buildApiSearchParams } from "../../utils/search-params.utils";
import { semvApi } from "../axios/apis.service";

export const PropertiesApiService = {
    async getProperty({
        subscription,
        ...params
    }: ICreateSearchParams<IProperty> & {
        subscription: string;
    }): Promise<IProperty> {
        const baseUrl = `/properties/${subscription}?`.concat(
            buildApiSearchParams(params)
        );
        const { data: propertieInfo } = await semvApi.get(baseUrl);

        return propertieInfo;
    },
    async listProperties(
        query: string,
        relations?: string[]
    ): Promise<IPaginateApiResponse<IProperty[]>> {
        const { data: properties } = await semvApi.get(
            `/properties?${query}&relations=${relations?.join(",")}`
        );

        return properties;
    },
    async updateProperty(payload: unknown): Promise<IProperty> {
        const { data: propertie } = await semvApi.patch(`/properties`, payload);

        return propertie;
    },
    async updloadPropertyFiles(
        subscription: string,
        payload: FormData
    ): Promise<{ fileName: string; destination: string }[]> {
        const { data } = await semvApi.post(
            `/properties/${subscription}/upload`,
            payload,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );

        return data.data;
    },
    async getPropertyBci(subscription: string): Promise<IBCIResponse> {
        const { data } = await semvApi.get(`/properties/${subscription}/bci`);

        return data;
    },
    async getPropertyConfrontante(
        subscription: string
    ): Promise<Pick<IBCIResponse, "property" | "geom">> {
        const { data } = await semvApi.get(
            `/properties/${subscription}/confrontante`
        );

        return data;
    },
    async getPropertyConsultaPrevia(
        subscription: string
    ): Promise<
        Pick<IConsultaPreviaResponse, "layers" | "property" | "geom" | "cnaes">
    > {
        const { data } = await semvApi.get(
            `/properties/${subscription}/consulta-previa`
        );

        return data;
    },
};
