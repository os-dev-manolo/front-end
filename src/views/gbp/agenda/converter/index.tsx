import moment from "moment";
import { string } from "yup";
import {
    IAgendaEventResponse,
    IAgendaTypedEvent,
} from "../../../../shared/interfaces/IEvent";

export const convertEvents = async (events: IAgendaEventResponse[]) => {
    const newEvents: IAgendaTypedEvent[] = [];

    events.forEach((element: IAgendaEventResponse) => {
        const allday = element.allDay;
        const event: IAgendaTypedEvent = {
            id: element.id,
            title: element.title,
            allDay: true,
            start: moment(element.start).toDate(),
            end: moment(element.start).toDate(),
        };
        newEvents.push(event);
    });
    console.log(newEvents);
    return newEvents;
};
