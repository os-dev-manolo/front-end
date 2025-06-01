import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/pt-br";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Modal, Button, Dropdown } from "react-bootstrap";

import { Header } from "../../../components/page-releated/gbp-crud-screen/header";
import { showToast } from "../../../components/global/toast";
import { AgendaApiService } from "../../../shared/services/api/agenda-api-service";
import { IAgendaTypedEvent } from "../../../shared/interfaces/IEvent";
import { convertEvents } from "./converter";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { EventsForm } from "../../../components/page-releated/agenda/events";
import { AgendaEvent } from "./events";

const localizer = momentLocalizer(moment);

// 🔵 Mapas de cores
const colorMap: Record<string, string> = {
    b: "#155a8a", // azul petróleo
    r: "#c43131", // vermelho queimado
    g: "#179a75", // verde musgo moderno
    o: "#b77407", // laranja mostarda
    p: "#4a2ea3", // roxo berinjela elegante
    0: "#4d4d4d",
};

// 🔥 Ícones e tags
const iconMap: Record<string, string> = {
    "@": "💼",
    "#": "📞",
    "!": "⚠️",
    "%": "🎯",
    "*": "🎂",
    "0": "",
};

const iconDescriptions: Record<string, string> = {
    "💼": "Reunião",
    "📞": "Notificação por WhatsApp",
    "⚠️": "Importante",
    "🎯": "Meta",
    "🎂": "Aniversário",
    "": "Evento Comum",
};

// 🎯 Parse do título do evento
function parseEventTitle(title: string) {
    const chars = Array.from(title);
    const colorLetter = chars[0] || "0";

    // Tags são os caracteres que aparecem depois da cor, até encontrar o primeiro espaço
    const tags: string[] = [];
    let i = 1;
    while (i < chars.length && Object.keys(iconMap).includes(chars[i])) {
        tags.push(chars[i]);
        i += 1;
    }

    const text = chars.slice(i).join("").trim();
    const icons = tags.map((tag) => iconMap[tag]).filter(Boolean);

    return { colorLetter, tags, icons, text };
}

export const Agenda: React.FC = () => {
    const [, setLoading] = useState(false);
    const [typedEvents, setEvents] = useState<IAgendaTypedEvent[]>([]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [showEventModal, setShowEventModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedEvent, setSelectedEvent] =
        useState<IAgendaTypedEvent | null>(null);

    const handleCloseEventModal = () => setShowEventModal(false);

    const handleCloseDetailModal = () => setShowDetailModal(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const eventsResponse = await AgendaApiService.getEvents();
            const convertedEvents = await convertEvents(eventsResponse.data);

            const birthdaysResponse = await AgendaApiService.getBirthdays();
            const aniversarios = birthdaysResponse.data.map(
                (evento: IAgendaTypedEvent) => ({
                    id: evento.id,
                    title: `p* ${evento.title}`, // Aniversário agora com *
                    start: new Date(evento.start),
                    end: new Date(evento.end),
                    allDay: evento.allDay,
                    type: "Aniversário",
                })
            );

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

    useEffect(() => {
        fetchData();
    }, []);

    const eventPropGetter = (event: IAgendaTypedEvent) => {
        const { colorLetter } = parseEventTitle(event.title);
        const backgroundColor = colorMap[colorLetter.toLowerCase()] || "black";

        return {
            style: {
                backgroundColor,
                borderRadius: "8px",
                opacity: 1,
                color: "white",
                border: "2px",
                display: "flex", // 🔥 Isso alinha internamente
                alignItems: "center", // 🔥 Alinha verticalmente
                justifyContent: "center", // 🔥 Alinha horizontalmente
                boxShadow: "0px 1px 4px rgba(0,0,0,0.5)", // sombra leve
            },
        };
    };

    const eventRenderer = ({ event }: { event: IAgendaTypedEvent }) => {
        const { icons, text } = parseEventTitle(event.title);

        const tooltipText = [
            text,
            ...icons.map((icon) => iconDescriptions[icon]),
        ]
            .filter(Boolean)
            .join(" — ");

        return (
            <div
                title={tooltipText}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "3px",
                    width: "100%",
                    height: "100%",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    color: "white",
                    textAlign: "center",
                    padding: "1px 2px", // 🔲 Padding interno
                    whiteSpace: "nowrap", // 🚫 Quebra de linha
                    overflow: "hidden",
                    textOverflow: "ellipsis", // ...
                }}
            >
                {icons.length > 0 && (
                    <span style={{ fontSize: "1rem" }}>{icons.join(" ")}</span>
                )}
                <span>{text}</span>
            </div>
        );
    };

    const handleSelectEvent = (event: IAgendaTypedEvent) => {
        setSelectedEvent(event);
        setShowDetailModal(true);
    };

    const getEventType = (event: IAgendaTypedEvent) => {
        const { icons } = parseEventTitle(event.title);
        return icons
            .map((icon) => iconDescriptions[icon] || "Evento comum")
            .join(", ");
    };

    const getEventTitle = (event: IAgendaTypedEvent) => {
        const { icons, text } = parseEventTitle(event.title);
        return `${icons.join(" ")} ${text}`.trim();
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const doAfterReset = () => {
        handleCloseEventModal();
        fetchData(); // Atualiza os eventos após criar
    };

    const [filters, setFilters] = useState<Record<string, boolean>>({
        "🎂": true, // Aniversário
        "🎯": true, // Meta
        "⚠️": true, // Importante
        "📞": true, // Notificação
        "💼": true, // Reunião
        "": true,
    });

    const toggleFilter = (icon: string) => {
        setFilters((prev) => ({
            ...prev,
            [icon]: !prev[icon],
        }));
    };

    const filteredEvents = typedEvents.filter((event) => {
        const { icons } = parseEventTitle(event.title);
        if (icons.length === 0) {
            return filters[""];
        }
        return icons.some((icon) => filters[icon]);
    });

    return (
        <div>
            <Header title="Agenda" />
            <AgendaEvent />

            <Dropdown className="mb-3">
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Filtros
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {Object.entries(iconDescriptions).map(([icon, label]) => (
                        <Dropdown.Item key={icon} as="div">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={filters[icon]}
                                    id={`filter-${icon}`}
                                    onChange={() => toggleFilter(icon)}
                                />
                                <label
                                    className="form-check-label ms-1"
                                    htmlFor={`filter-${icon}`}
                                    style={{
                                        cursor: "pointer",
                                        userSelect: "none",
                                    }}
                                >
                                    <span style={{ marginRight: 4 }}>
                                        {icon}
                                    </span>
                                    {label}
                                </label>
                            </div>
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>

            <Calendar
                localizer={localizer}
                events={filteredEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 800 }}
                onSelectEvent={handleSelectEvent}
                eventPropGetter={eventPropGetter}
                components={{ event: eventRenderer }}
                messages={{
                    next: "Próximo",
                    previous: "Anterior",
                    today: "Hoje",
                    month: "Mês",
                    week: "Semana",
                    day: "Dia",
                    agenda: "Agenda",
                }}
                titleAccessor={(event) => {
                    const { icons, text } = parseEventTitle(event.title);
                    return [
                        text,
                        ...icons.map((i) => iconDescriptions[i] || ""),
                    ]
                        .filter(Boolean)
                        .join(" — ");
                }}
            />

            {/* Modal Detalhes */}
            <Modal
                show={showDetailModal}
                onHide={handleCloseDetailModal}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Detalhes do Evento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedEvent && (
                        <>
                            <p>
                                <strong>Tipo:</strong>{" "}
                                {getEventType(selectedEvent)}
                            </p>
                            <p>
                                <strong>Título:</strong>{" "}
                                {getEventTitle(selectedEvent)}
                            </p>
                            <p>
                                <strong>Início:</strong>{" "}
                                {moment(selectedEvent.start).format(
                                    "DD/MM/YYYY HH:mm"
                                )}
                            </p>
                            <p>
                                <strong>Término:</strong>{" "}
                                {moment(selectedEvent.end).format(
                                    "DD/MM/YYYY HH:mm"
                                )}
                            </p>
                            <p>
                                <strong>Descrição:</strong>{" "}
                                {selectedEvent.description || "-"}
                            </p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleCloseDetailModal}
                    >
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
