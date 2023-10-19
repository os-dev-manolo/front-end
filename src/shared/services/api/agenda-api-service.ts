import { IAgendaEvent, IAgendaEventResponse } from "../../interfaces/IEvent";
import { IPaginateApiResponse } from "../../interfaces/IPaginate";
import { IRolesResponse } from "../../interfaces/IRoles";
import { semvApi } from "../axios/apis.service";

export const AgendaApiService = {
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

    async createEvent(payload: IAgendaEvent) {
        const { data } = await semvApi.post(`/agenda/event/new`, payload);

        return data;
    },
    async getEvents() {
        const { data } = await semvApi.get<
            IPaginateApiResponse<IAgendaEventResponse[]>
        >(`/agenda/events/`);

        return data;
    },
};
