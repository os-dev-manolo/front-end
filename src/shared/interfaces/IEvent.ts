export interface IAgendaEvent {
    id?: number | string;
    title: string;
    description?: string;
    allday?: string;
    start: Date;
    end: Date;
    members?: string[];
    color?: string;
    notifyOnDate?: boolean;
    rrule?: string;
}

export interface IAgendaEventResponse {
    description: string;
    notifyOnDate: boolean;
    color: unknown;
    icon: unknown;
    type: string;
    id: number;
    title: string;
    allday: string;
    start: string;
    end: string;
}

export interface IAgendaTypedEvent {
    originalId: string | number | undefined;
    description?: string;
    icon?: unknown;
    type: unknown;
    id?: string | number;
    title: string;
    allDay: boolean;
    start: Date;
    end: Date;
    reminder?: boolean;
    rrule?: string; // exemplo: "monday,wednesday,friday"
    members?: string[];
    color?: string;
    notifyOnDate?: boolean;
}
