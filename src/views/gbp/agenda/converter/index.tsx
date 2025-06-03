import moment from "moment";
import {
    IAgendaEventResponse,
    IAgendaTypedEvent,
} from "../../../../shared/interfaces/IEvent";

export const convertEvents = async (events: IAgendaEventResponse[]) => {
    const newEvents: IAgendaTypedEvent[] = [];

    events.forEach((element: IAgendaEventResponse) => {
        const event: IAgendaTypedEvent = {
            id: element.id,
            title: element.title, // 🔥 remove letra da cor + ícone
            allDay: String(element.allday).toLowerCase() === "true",
            start: moment(element.start).toDate(),
            end: moment(element.end).toDate(),
            resource: {
                color: element.color, // 🔥 pega do banco ou processa da letra
                icon: element.icon, // 🔥 idem
                notifyOnDate: element.notifyOnDate,
            },
            type: undefined,
            description: element.description,
        };
        newEvents.push(event);
    });

    return newEvents;
};
