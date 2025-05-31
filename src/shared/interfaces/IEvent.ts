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
    notifyOnDate: any;
    color: any;
    icon: any;
    type: string;
    id: number;
    title: string;
    allday: string;
    start: string;
    end: string;
}

export interface IAgendaTypedEvent {
    description: string;
    icon?: any;
    type: any;
    resource: any;
    id: number;
    title: string;
    allDay: boolean;
    start: Date;
    end: Date;
    reminder?: any;
}
