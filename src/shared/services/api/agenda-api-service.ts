import { IAgendaEvent, IAgendaEventResponse } from "../../interfaces/IEvent";
import { IPaginateApiResponse } from "../../interfaces/IPaginate";
import { semvApi } from "../axios/apis.service";

export const AgendaApiService = {
    async createEvent(event: IAgendaEvent): Promise<IAgendaEvent> {
        // Manda já os membros no payload
        const { data: createdEvent } = await semvApi.post(
            "/agenda/event/new",
            event
        );
        return createdEvent;
    },
    async getEvents(params: { start: Date; end: Date }) {
        const { data } = await semvApi.get<
            IPaginateApiResponse<IAgendaEventResponse[]>
        >(`/agenda/events/range`, {
            params: {
                start: params.start.toISOString(),
                end: params.end.toISOString(),
            },
        });
        return data;
    },

    async getBirthdays(params: { start: Date; end: Date }) {
        const { data } = await semvApi.get(`/events/birthdays/range`, {
            params: {
                start: params.start.toISOString(),
                end: params.end.toISOString(),
            },
        });
        return data;
    },

    async deleteEvent(
        id: number,
        params?: { scope: "only" | "thisAndFuture" | "all"; date: string }
    ) {
        const response = await semvApi.delete(`/agenda/event/${id}`, {
            data: params,
        });
        if (response.status === 200 || response.status === 204) {
            return true;
        }
        throw new Error("Erro ao excluir evento");
    },

    async updateEvent(
        id: number,
        event: IAgendaEvent,
        scope: "only" | "thisAndFuture" | "all",
        date: string
    ): Promise<IAgendaEvent> {
        const { data: updatedEvent } = await semvApi.put(
            `/agenda/event/${id}`,
            {
                ...event, // já tem members!
                scope,
                occurrenceDate: date,
            }
        );
        return updatedEvent;
    },
    async getEventMembers(eventId: number) {
        const { data } = await semvApi.get(`/agenda/event/${eventId}/members`);
        return data; // Retorna array de pessoas
    },

    async addEventMembers(eventId: number, pessoaIds: (string | number)[]) {
        const numericIds = pessoaIds.map((id) => Number(id));
        const { data } = await semvApi.post(
            `/agenda/event/${eventId}/members`,
            {
                pessoa_ids: numericIds,
            }
        );
        return data;
    },
    async createEventException(
        eventId: number,
        params: { date: string; action: "delete" | "edit"; payload?: any }
    ) {
        const { data } = await semvApi.post(
            `/agenda/event/${eventId}/exception`,
            params
        );
        return data;
    },

    async removeEventMember(eventId: number, pessoaId: number) {
        const { data } = await semvApi.delete(
            `/agenda/event/${eventId}/members/${pessoaId}`
        );
        return data; // { message: string }
    },

    async replaceEventMembers(eventId: number, pessoaIds: number[]) {
        const { data } = await semvApi.put(`/agenda/event/${eventId}/members`, {
            pessoaIds,
        });
        return data; // { message: string }
    },

    async getPeople() {
        const { data } = await semvApi.get("/agenda/event/pessoa-fisica");
        return data; // depende do formato da resposta, pode precisar ajustar
    },

    async deleteRecurringFromDate(
        eventId: number,
        params: { fromDate: string }
    ) {
        // Se seguir seu padrão REST: rota tem o prefixo /agenda/event/
        const { data } = await semvApi.post(
            `/agenda/event/${eventId}/delete-from-date`,
            params
        );
        return data;
    },

};
