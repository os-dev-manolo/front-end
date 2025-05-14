import "bootstrap/dist/css/bootstrap.min.css";

import React, { useCallback, useEffect, useState } from "react";

import moment from "moment";
import "moment/locale/pt-br";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Header } from "../../../components/page-releated/gbp-crud-screen/header";
import { AgendaEvent } from "./events";
import { showToast } from "../../../components/global/toast";
import { AgendaApiService } from "../../../shared/services/api/agenda-api-service";
import {
    IAgendaEventResponse,
    IAgendaTypedEvent,
} from "../../../shared/interfaces/IEvent";
import { IPaginateApiResponse } from "../../../shared/interfaces/IPaginate";
import { convertEvents } from "./converter";

const localizer = momentLocalizer(moment);
const events = [
    {
        id: 0,
        title: "All Day Event very long title",
        allDay: true,
        start: new Date(2023, 10, 0),
        end: new Date(2023, 10, 1),
    },
    {
        id: 1,
        title: "Long Event",
        start: new Date(2023, 10, 7),
        end: new Date(2023, 10, 10),
    },

    {
        id: 2,
        title: "DTS STARTS",
        start: new Date(2023, 10, 13, 0, 0, 0),
        end: new Date(2023, 10, 20, 0, 0, 0),
    },

    {
        id: 3,
        title: "DTS ENDS",
        start: new Date(2023, 10, 6, 0, 0, 0),
        end: new Date(2023, 10, 13, 0, 0, 0),
    },

    {
        id: 4,
        title: "Some Event",
        start: new Date(2023, 1, 9, 0, 0, 0),
        end: new Date(2023, 10, 10, 0, 0, 0),
    },
    {
        id: 5,
        title: "Conference",
        start: new Date(2023, 10, 11),
        end: new Date(2023, 10, 13),
        desc: "Big conference for important people",
    },
    {
        id: 6,
        title: "Meeting",
        start: new Date(2023, 10, 12, 10, 30, 0, 0),
        end: new Date(2023, 10, 12, 12, 30, 0, 0),
        desc: "Pre-meeting meeting, to prepare for the meeting",
    },
    {
        id: 7,
        title: "Lunch",
        start: new Date(2023, 10, 12, 12, 0, 0, 0),
        end: new Date(2023, 10, 12, 13, 0, 0, 0),
        desc: "Power lunch",
    },
    {
        id: 8,
        title: "Meeting",
        start: new Date(2023, 10, 12, 14, 0, 0, 0),
        end: new Date(2023, 10, 12, 15, 0, 0, 0),
    },
    {
        id: 9,
        title: "Happy Hour",
        start: new Date(2023, 10, 12, 17, 0, 0, 0),
        end: new Date(2023, 10, 12, 17, 30, 0, 0),
        desc: "Most important meal of the day",
    },
    {
        id: 10,
        title: "Dinner",
        start: new Date(2023, 10, 12, 20, 0, 0, 0),
        end: new Date(2023, 10, 12, 21, 0, 0, 0),
    },
    {
        id: 11,
        title: "Birthday Party",
        start: new Date(2023, 10, 13, 7, 0, 0),
        end: new Date(2023, 10, 13, 10, 30, 0),
    },
    {
        id: 12,
        title: "Late Night Event",
        start: new Date(2023, 10, 17, 19, 30, 0),
        end: new Date(2023, 10, 18, 2, 0, 0),
    },
    {
        id: 12.5,
        title: "Late Same Night Event",
        start: new Date(2023, 10, 17, 19, 30, 0),
        end: new Date(2023, 10, 17, 23, 30, 0),
    },
    {
        id: 13,
        title: "Multi-day Event",
        start: new Date(2023, 10, 20, 19, 30, 0),
        end: new Date(2023, 10, 22, 2, 0, 0),
    },
    {
        id: 14,
        title: "Hoje",
        start: new Date(new Date().setHours(new Date().getHours() - 3)),
        end: new Date(new Date().setHours(new Date().getHours() + 3)),
    },
    {
        id: 15,
        title: "Hoje",
        start: new Date(new Date().setHours(new Date().getHours() - 3)),
        end: new Date(new Date().setHours(new Date().getHours() + 3)),
    },
    {
        id: 16,
        title: "Hoje",
        start: new Date(new Date().setHours(new Date().getHours() - 3)),
        end: new Date(new Date().setHours(new Date().getHours() + 3)),
    },
    {
        id: 17,
        title: "Hoje",
        start: new Date(new Date().setHours(new Date().getHours() - 3)),
        end: new Date(new Date().setHours(new Date().getHours() + 3)),
    },
    {
        id: 18,
        title: "Hoje",
        start: new Date(new Date().setHours(new Date().getHours() - 3)),
        end: new Date(new Date().setHours(new Date().getHours() + 3)),
    },
];

export const Agenda: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const [typedEvents, setEvents] = useState<IAgendaTypedEvent[]>();

    const fetchEvents = useCallback(async () => {
        try {
            setLoading(true);

            const eventsResponse = await AgendaApiService.getEvents();
            const convertedEvents = await convertEvents(eventsResponse.data);
            setEvents(convertedEvents);

            showToast({
                type: "success",
                message: "Eventos carregados corretamente",
            });
        } catch (err) {
            // ApiErrorHandler(err);
            // const validationError = yupValidation(err);
            // formRef.current?.setErrors(validationError);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div>
            <p>Calendário</p>
            <AgendaEvent />
            {/* {fetchedEvents &&
                fetchedEvents.map((event) => {
                    return (
                        <div key={event.id}>
                            <strong>Confrontação {event.title}</strong>
                        </div>
                    );
                })} */}
            {/* <h4>{moment(new Date()).locale("ptBr").format("LLLL")}</h4> */}
            {!loading && typedEvents && (
                <div style={{ height: "500pt" }}>
                    <Calendar
                        events={typedEvents}
                        startAccessor="start"
                        endAccessor="end"
                        defaultDate={moment().toDate()}
                        localizer={localizer}
                        messages={{
                            next: "Seguinte",
                            previous: "Anterior",
                            today: "Hoje",
                            month: "Mês",
                            week: "Semana",
                            day: "Dia",
                            noEventsInRange: "Não existem eventos nessa data.",
                            allDay: "Dia inteiro",
                            tomorrow: "Amanhã",
                            yesterday: "Ontem",
                            event: "Evento",
                            agenda: "Agenda",
                            date: "Data",
                            time: "Hora",
                        }}
                        showAllEvents
                    />
                </div>
            )}
        </div>
    );
};
