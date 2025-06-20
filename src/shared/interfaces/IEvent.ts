export interface IAgendaEvent {
    id?: number | string;
    title: string;
    description?: string;
    allday: string;
    start: Date;
    end: Date;
    members: string;
    color?: string;
    notifyOnDate?: boolean;
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
    description: string;
    icon?: unknown;
    type: unknown;
    resource: unknown;
    id: number;
    title: string;
    allDay: boolean;
    start: Date;
    end: Date;
    reminder?: boolean;
}
