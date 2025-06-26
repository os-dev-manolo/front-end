import { rrulestr } from "rrule";
import {
    IAgendaEvent,
    IAgendaTypedEvent,
} from "../../../shared/interfaces/IEvent";

export const generateRRuleInstances = (
    event: IAgendaEvent,
    dateRange: { start: Date; end: Date }
): IAgendaTypedEvent[] => {
    const start = new Date(event.start);
    const end = new Date(event.end);
    const duration = end.getTime() - start.getTime();

    if (!event.rrule) {
        return [
            {
                id: String(event.id),
                title: event.title,
                description: event.description ?? "",
                type: "event",
                allDay: !!event.allday,
                start,
                end,
                originalId: undefined,
            },
        ];
    }

    const rule = rrulestr(event.rrule);
    const dates = rule.between(dateRange.start, dateRange.end, true);

    return dates.map((dt) => ({
        id: `${event.id}-${dt.getTime()}`,
        originalId: String(event.id),
        title: event.title,
        description: event.description ?? "",
        type: "event",
        allDay: !!event.allday,
        start: dt,
        end: new Date(dt.getTime() + duration),
    }));
};
