import { semvApi } from "../axios/apis.service";
import {
    IConfrontanteProperty,
    IConfrontantePropertyPOST,
    IConfrontanteSide,
    IConfrontanteSidePOST,
    IPropertyConfrontantes,
} from "../../providers/property/interfaces/property-confrontantes.interface";
import { IPaginateApiResponse } from "../../interfaces/IPaginate";

export const ConfrontanteInfoApiService = {
    async getConfrontanteInfo(
        registration: string
    ): Promise<IPropertyConfrontantes> {
        const { data: confrontante } =
            await semvApi.get<IPropertyConfrontantes>(
                `/properties/${registration}/confrontacoes`
            );
        return confrontante;
    },
    async getConfrontanteImovel(
        registration: string
    ): Promise<IConfrontanteProperty> {
        const { data: response } = await semvApi.get<IConfrontanteProperty>(
            `/properties/confrontante/${registration}`
        );
        return response as IConfrontanteProperty;
    },
    async postConfrontanteImovel(
        payload: IConfrontantePropertyPOST
    ): Promise<IConfrontanteProperty> {
        const { data: response } = await semvApi.patch(
            "/properties/confrontantes",
            payload
        );
        return response as IConfrontanteProperty;
    },
    async saveConfrontanteSide(
        payload: IConfrontanteSidePOST
    ): Promise<IConfrontanteSide> {
        const { data: response } = await semvApi.patch(
            "/properties/confrontantes/confrontacoes",
            payload
        );
        return response as IConfrontanteSide;
    },
    async getConfrontanteSide(
        registration: string,
        side: string
    ): Promise<IPaginateApiResponse<IConfrontanteSide[]>> {
        const { data: response } = await semvApi.get<
            IPaginateApiResponse<IConfrontanteSide[]>
        >(`/properties/confrontantes/confrontacoes/${registration}/${side}`);
        return response;
    },
    async deleteConfrontanteSide(id: string): Promise<number> {
        const { data: response } = await semvApi.delete(
            `/properties/confrontantes/confrontacoes/${id}`
        );
        return response;
    },
};
