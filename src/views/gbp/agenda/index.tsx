import "bootstrap/dist/css/bootstrap.min.css";

import React, { useEffect, useState } from "react";

import moment from "moment";
import "moment/locale/pt-br";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Header } from "../../../components/page-releated/gbp-crud-screen/header";
import { AgendaEvent } from "./events";
import { showToast } from "../../../components/global/toast";
import { AgendaApiService } from "../../../shared/services/api/agenda-api-service";
import { IAgendaTypedEvent } from "../../../shared/interfaces/IEvent";
import { convertEvents } from "./converter";

const localizer = momentLocalizer(moment);

export const Agenda: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [typedEvents, setEvents] = useState<IAgendaTypedEvent[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // 🔹 Busca eventos da tabela
                const eventsResponse = await AgendaApiService.getEvents();
                const convertedEvents = await convertEvents(
                    eventsResponse.data
                );
                // 🔸 Busca aniversariantes
                const birthdaysResponse = await AgendaApiService.getBirthdays();
                const aniversarios = birthdaysResponse.data.map(
                    (evento: IAgendaTypedEvent) => ({
                        id: evento.id,
                        title: evento.title,
                        start: new Date(evento.start),
                        end: new Date(evento.end),
                        allDay: evento.allDay,
                    })
                );

                // 🔥 Junta todos os eventos
                const allEvents = [...convertedEvents, ...aniversarios];
                setEvents(allEvents);

                showToast({
                    type: "success",
                    message: "Eventos carregados corretamente",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Header title="Agenda" />

            <AgendaEvent />

            {!loading && typedEvents.length > 0 && (
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

            {loading && <p>Carregando eventos...</p>}
        </div>
    );
};
