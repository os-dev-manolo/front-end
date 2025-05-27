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
            title: element.title,
            allDay: String(element.allday).toLowerCase() === "true",
            start: moment(element.start).toDate(),
            end: moment(element.end).toDate(),
        };
        newEvents.push(event);
    });

    return newEvents;
};
