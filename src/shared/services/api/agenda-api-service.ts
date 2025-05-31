import { IAgendaEvent, IAgendaEventResponse } from "../../interfaces/IEvent";
import { IPaginateApiResponse } from "../../interfaces/IPaginate";
import { semvApi } from "../axios/apis.service";

export const AgendaApiService = {
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

    async getBirthdays() {
        const { data } = await semvApi.get(`/agenda/events/birthdays`);
        return data;
    },

    async deleteEvent(id: number | string) {
        const { data } = await semvApi.delete(`/agenda/event/${id}`);
        return data;
    },

    async updateEvent(id: number | string, payload: IAgendaEvent) {
        const { data } = await semvApi.put(`/agenda/event/${id}`, payload);
        return data;
    },
};
