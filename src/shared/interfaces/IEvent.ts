export interface IAgendaEvent {
    title: string;
    allday: string;
    start: Date;
    end: Date;
    members: string;
}

export interface IAgendaEventResponse {
    id: number;
    title: string;
    allDay: string;
    start: string;
    end: string;
}

export interface IAgendaTypedEvent {
    id: number;
    title: string;
    allDay: boolean;
    start: Date;
    end: Date;
}
