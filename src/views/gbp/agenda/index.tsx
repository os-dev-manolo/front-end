/* eslint-disable jsx-a11y/label-has-associated-control */
import { View } from "react-big-calendar";
import { rrulestr } from "rrule";
import {
    IAgendaEvent,
    IAgendaTypedEvent,
} from "../../../shared/interfaces/IEvent";
import {
    React,
    useEffect,
    useMemo,
    useRef,
    useState,
    useContext,
    moment,
    Calendar,
    momentLocalizer,
    Modal,
    Button,
    Dropdown,
    toast,
    AgendaApiService,
    AgendaEvent,
    AgendaEventEdit,
    EventDetailModal,
    useFilters,
    iconMap,
    colorMap,
    iconDescriptions,
    LoadingContext,
    handleNavigate,
} from "./imports";

const localizer = momentLocalizer(moment);

export const Agenda: React.FC = () => {
    const { filters, setFilters } = useFilters();
    const { setLoading } = useContext(LoadingContext);
    const [dateRange, setDateRange] = useState(() => ({
        start: moment().startOf("month").toDate(),
        end: moment().endOf("month").toDate(),
    }));

    // ---- ADICIONADOS ----
    const [showEditScopeModal, setShowEditScopeModal] = useState(false);
    const [editScope, setEditScope] = useState<
        "only" | "all" | "thisAndFuture"
    >("only");
    // ---------------------

    const [showDeleteScopeModal, setShowDeleteScopeModal] = useState(false);
    const [deleteScope, setDeleteScope] = useState<
        "only" | "all" | "thisAndFuture"
    >("only");
    const [typedEvents, setEventos] = useState<IAgendaTypedEvent[]>([]);
    const [currentView, setCurrentView] = useState<View>("month");
    const [selectedEvent, setSelectedEvent] =
        useState<IAgendaTypedEvent | null>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const onNavigate = (date: Date) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            handleNavigate(date, currentView, setDateRange);
        }, 250);
    };

    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState<{
        x: number;
        y: number;
    } | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [eventToDelete, setEventToDelete] =
        useState<IAgendaTypedEvent | null>(null);

    const parseEventTitle = (
        title: string,
        rrule?: string,
        members?: any[]
    ) => {
        const chars = Array.from(title.trim());
        const colorLetter = chars[0] || "0";

        const tags: string[] = [];
        let i = 1;
        while (i < chars.length && iconMap[chars[i]] !== undefined) {
            tags.push(chars[i]);
            i += 1;
        }

        const text = chars.slice(i).join("").trim();
        let icons = tags.map((tag) => iconMap[tag]).filter(Boolean);

        if (members && members.length > 0) icons.push("👥");
        // Agora a corrente sempre no início se for recorrente
        if (rrule) icons = ["🔗", ...icons];

        return { colorLetter, icons, text };
    };

    const filteredEvents = useMemo(() => {
        return typedEvents
            .filter((event) => {
                const start = moment(event.start);
                const end = moment(event.end);
                const rangeStart = moment(dateRange.start);
                const rangeEnd = moment(dateRange.end);
                return (
                    start.isSameOrBefore(rangeEnd, "day") &&
                    end.isSameOrAfter(rangeStart, "day")
                );
            })
            .filter((event) => {
                const { icons } = parseEventTitle(
                    event.title,
                    undefined,
                    event.members
                );
                if (icons.length === 0) return filters[""];
                return icons.some((icon) => filters[icon]);
            });
    }, [typedEvents, filters, dateRange]);

    function expandEvent(
        event: IAgendaTypedEvent,
        rangeStart: Date,
        rangeEnd: Date
    ): IAgendaTypedEvent[] {
        if (!event.rrule || String(event.id).includes("-") || event.originalId)
            return [event];
        const dur =
            new Date(event.end).getTime() - new Date(event.start).getTime();
        const rule = rrulestr(event.rrule);
        const dates = rule.between(rangeStart, rangeEnd, true);

        return dates.map((date) => ({
            ...event,
            start: date,
            end: new Date(date.getTime() + dur),
            id: `${event.id}-${date.toISOString()}`,
            originalId: event.id,
        }));
    }

    const fetchData = async () => {
        try {
            setLoading(true);
            const [eventsResponse, birthdaysResponse] = await Promise.all([
                AgendaApiService.getEvents(dateRange),
                AgendaApiService.getBirthdays(dateRange),
            ]);

            const events = eventsResponse.data.map((e: any) => ({
                ...e,
                start: new Date(e.start),
                end: new Date(e.end),
                members: Array.isArray(e.members) ? e.members : [],
            }));

            const rangeStart = dateRange.start;
            const rangeEnd = dateRange.end;

            const expandedEvents = events.flatMap((ev) =>
                expandEvent(ev, rangeStart, rangeEnd)
            );

            const birthdays = birthdaysResponse.data.flatMap((pessoa: any) => {
                const nascimento = moment(pessoa.nascimento);
                const baseYear = moment(dateRange.start).year();
                const endYear = moment(dateRange.end).year();

                return Array.from(
                    { length: endYear - baseYear + 1 },
                    (_, i) => {
                        const year = baseYear + i;
                        let aniversario = moment({
                            year,
                            month: nascimento.month(),
                            date: nascimento.date(),
                        });

                        if (!aniversario.isValid()) {
                            if (
                                nascimento.date() === 29 &&
                                nascimento.month() === 1
                            ) {
                                aniversario = moment({
                                    year,
                                    month: 1,
                                    date: 28,
                                });
                            } else return null;
                        }

                        if (
                            !aniversario.isBetween(
                                dateRange.start,
                                dateRange.end,
                                null,
                                "[]"
                            )
                        ) {
                            return null;
                        }

                        return {
                            id: `bday-${pessoa.id}-${year}`,
                            title: `p*0${pessoa.nome}`,
                            description: `${year - nascimento.year()} anos`,
                            start: aniversario.toDate(),
                            end: aniversario.toDate(),
                            allDay: true,
                            type: "Aniversário",
                        };
                    }
                ).filter(Boolean);
            });

            setEventos([...expandedEvents, ...birthdays]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        onNavigate(new Date());
    }, []);

    useEffect(() => {
        fetchData();
    }, [dateRange]);

    const eventPropGetter = (event: IAgendaTypedEvent) => {
        const { colorLetter } = parseEventTitle(
            event.title,
            undefined,
            event.members
        );
        return {
            style: {
                backgroundColor:
                    colorMap[colorLetter.toLowerCase()] || "purple",
                boxShadow: "0 1px 4px rgba(0,0,0,0.5)",
            },
        };
    };

    const handleSelectEvent = (
        event: IAgendaTypedEvent,
        e: React.MouseEvent
    ) => {
        e.preventDefault();
        setSelectedEvent(event);
        setMenuPosition({ x: e.clientX, y: e.clientY });
        setMenuVisible(true);
    };

    const handleDelete = async () => {
        if (!eventToDelete) return;
        const id = String(eventToDelete.id).split("-")[0];

        try {
            await AgendaApiService.deleteEvent(Number(id));
            toast.success("Evento deletado!");
            fetchData();
        } catch (error) {
            toast.error("Erro ao deletar evento.");
        } finally {
            setMenuVisible(false);
            setShowDeleteModal(false);
            setEventToDelete(null);
        }
    };

    useEffect(() => {
        const clickOutside = (e: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target as Node)
            ) {
                setMenuVisible(false);
            }
        };
        if (menuVisible) document.addEventListener("mousedown", clickOutside);
        return () => document.removeEventListener("mousedown", clickOutside);
    }, [menuVisible]);

    const toggleFilter = (icon: string) => {
        setFilters((prev) => ({ ...prev, [icon]: !prev[icon] }));
    };

    const getEventTitle = (event: IAgendaTypedEvent) => {
        const { icons, text } = parseEventTitle(
            event.title,
            undefined,
            event.members
        );
        return `${icons.join(" ")} ${text}`.trim();
    };

    const getEventType = (event: IAgendaTypedEvent) => {
        const { icons } = parseEventTitle(
            event.title,
            undefined,
            event.members
        );
        return icons.map((i) => iconDescriptions[i] || "Evento").join(", ");
    };

    const eventRenderer = ({ event }: { event: IAgendaTypedEvent }) => {
        const { icons, text } = parseEventTitle(
            event.title,
            event.rrule,
            event.members
        );
        const tooltip = [
            text,
            ...icons.map((i) =>
                i === "🔗" ? "Evento recorrente" : iconDescriptions[i] || i
            ),
        ]
            .filter(Boolean)
            .join(" — ");

        return (
            <div
                title={tooltip}
                onContextMenu={(e) => handleSelectEvent(event, e)}
            >
                {icons.length > 0 && (
                    <span style={{ marginRight: 4 }}>{icons.join("")}</span>
                )}
                <span>{text}</span>
            </div>
        );
    };

    return (
        <div>
            <AgendaEvent
                onEventCreated={async (newEvent: IAgendaEvent) => {
                    const tempId = `temp-${Date.now()}`;
                    const typedTempEvent: IAgendaTypedEvent = {
                        id: tempId,
                        title: newEvent.title,
                        description: newEvent.description ?? "",
                        type: "default",
                        allDay: ["true", "1", "yes", "True"].includes(
                            newEvent.allday as string
                        ),
                        start: newEvent.start,
                        end: newEvent.end,
                        icon: undefined,
                        reminder: newEvent.notifyOnDate ?? false,
                        originalId: undefined,
                        members: Array.isArray(newEvent.members)
                            ? newEvent.members
                            : [],
                    };

                    setEventos((prev) => [...prev, typedTempEvent]);

                    try {
                        const result = await AgendaApiService.createEvent(
                            newEvent
                        );

                        const savedEvent = {
                            ...result,
                            start: new Date(result.start),
                            end: new Date(result.end),
                            members: Array.isArray(result.members)
                                ? result.members
                                : [],
                        };

                        setEventos((prev) => [
                            ...prev.filter((ev) => ev.id !== tempId),
                            {
                                ...savedEvent,
                                id: String(savedEvent.id),
                                type: "event",
                                allDay: !!savedEvent.allday,
                                originalId: undefined,
                            },
                        ]);

                        toast.success("Evento criado com sucesso!");
                        await fetchData();
                    } catch (error) {
                        setEventos((prev) =>
                            prev.filter((ev) => ev.id !== tempId)
                        );
                        toast.error("Erro ao criar evento.");
                    }
                }}
            />

            <Dropdown className="mb-2">
                <Dropdown.Toggle variant="string">Filtros</Dropdown.Toggle>
                <Dropdown.Menu>
                    {Object.entries(iconDescriptions).map(([icon, label]) => (
                        <Dropdown.Item key={icon} as="div">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={filters[icon]}
                                    id={`filter-${icon}`}
                                    onChange={() => toggleFilter(icon)}
                                />
                                <label
                                    className="form-check-label ms-1"
                                    htmlFor={`filter-${icon}`}
                                >
                                    {icon} {label}
                                </label>
                            </div>
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>

            <div className="agenda-container">
                <Calendar
                    step={30}
                    timeslots={2}
                    onNavigate={onNavigate}
                    localizer={localizer}
                    events={filteredEvents}
                    startAccessor="start"
                    endAccessor="end"
                    view={currentView}
                    onView={setCurrentView}
                    views={["month", "week", "day"]}
                    style={{ height: 800 }}
                    onSelectEvent={(event, e) =>
                        handleSelectEvent(
                            event as IAgendaTypedEvent,
                            e as unknown as React.MouseEvent
                        )
                    }
                    eventPropGetter={eventPropGetter}
                    components={{ event: eventRenderer }}
                    popup
                    messages={{
                        today: "Hoje",
                        previous: "Anterior",
                        next: "Próximo",
                        month: "Mês",
                        week: "Semana",
                        day: "Dia",
                        agenda: "Agenda",
                        date: "Data",
                        time: "Hora",
                        event: "Evento",
                        showMore: (total) => `+${total} mais`,
                    }}
                    titleAccessor={(event) =>
                        getEventTitle(event as IAgendaTypedEvent)
                    }
                />
            </div>

            {/* ----------- MENU CONTEXTUAL ------------ */}
            {menuVisible && menuPosition && (
                <div
                    ref={menuRef}
                    style={{
                        position: "fixed",
                        top: menuPosition.y,
                        left: menuPosition.x,
                        backgroundColor: "white",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                        borderRadius: 8,
                        zIndex: 9999,
                        width: 180,
                        padding: 8,
                    }}
                >
                    <Button
                        variant="outline-primary"
                        className="w-100 mb-1"
                        onClick={() => {
                            setShowDetailModal(true);
                            setMenuVisible(false);
                        }}
                    >
                        👁️ Visualizar
                    </Button>
                    <Button
                        variant="outline-primary"
                        className="w-100 mb-1"
                        onClick={() => {
                            if (selectedEvent?.rrule) {
                                setShowEditScopeModal(true);
                                setMenuVisible(false);
                            } else {
                                setShowEditModal(true);
                                setMenuVisible(false);
                            }
                        }}
                    >
                        📝 Editar
                    </Button>
                    <Button
                        variant="outline-danger"
                        className="w-100"
                        onClick={() => {
                            if (selectedEvent?.rrule) {
                                setShowDeleteScopeModal(true);
                                setMenuVisible(false);
                            } else {
                                setEventToDelete(selectedEvent);
                                setShowDeleteModal(true);
                                setMenuVisible(false);
                            }
                        }}
                    >
                        ❌ Excluir
                    </Button>
                </div>
            )}

            {/* ----------- MODAL DE ESCOPO DE EDIÇÃO ------------ */}
            <Modal
                show={showEditScopeModal}
                onHide={() => setShowEditScopeModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Editar Evento Recorrente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Este evento faz parte de uma recorrência. O que você
                        deseja editar?
                    </p>
                    <div>
                        <label className="d-block">
                            <input
                                type="radio"
                                name="editScope"
                                value="only"
                                checked={editScope === "only"}
                                onChange={() => setEditScope("only")}
                            />
                            Só esta ocorrência
                        </label>
                        <label className="d-block">
                            <input
                                type="radio"
                                name="editScope"
                                value="thisAndFuture"
                                checked={editScope === "thisAndFuture"}
                                onChange={() => setEditScope("thisAndFuture")}
                            />
                            Desta ocorrência em diante
                        </label>
                        <label className="d-block">
                            <input
                                type="radio"
                                name="editScope"
                                value="all"
                                checked={editScope === "all"}
                                onChange={() => setEditScope("all")}
                            />
                            Todas as ocorrências
                        </label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowEditScopeModal(false)}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            setShowEditScopeModal(false);
                            setShowEditModal(true);
                        }}
                    >
                        Editar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* ----------- MODAL DE ESCOPO DE EXCLUSÃO ------------ */}
            <Modal
                show={showDeleteScopeModal}
                onHide={() => setShowDeleteScopeModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Excluir Evento Recorrente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Este evento faz parte de uma recorrência. O que você
                        deseja excluir?
                    </p>
                    <div>
                        <label className="d-block">
                            <input
                                type="radio"
                                name="deleteScope"
                                value="only"
                                checked={deleteScope === "only"}
                                onChange={() => setDeleteScope("only")}
                            />
                            Só esta ocorrência
                        </label>
                        <label className="d-block">
                            <input
                                type="radio"
                                name="deleteScope"
                                value="thisAndFuture"
                                checked={deleteScope === "thisAndFuture"}
                                onChange={() => setDeleteScope("thisAndFuture")}
                            />
                            Desta ocorrência em diante
                        </label>
                        <label className="d-block">
                            <input
                                type="radio"
                                name="deleteScope"
                                value="all"
                                checked={deleteScope === "all"}
                                onChange={() => setDeleteScope("all")}
                            />
                            Todas as ocorrências
                        </label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowDeleteScopeModal(false)}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="danger"
                        onClick={async () => {
                            if (selectedEvent) {
                                if (deleteScope === "only") {
                                    await AgendaApiService.createEventException(
                                        Number(selectedEvent.id),
                                        {
                                            date: moment(
                                                selectedEvent.start
                                            ).format("YYYY-MM-DD"),
                                            action: "delete",
                                        }
                                    );
                                }
                                if (deleteScope === "all") {
                                    await AgendaApiService.deleteEvent(
                                        Number(selectedEvent.id)
                                    );
                                }
                                if (deleteScope === "thisAndFuture") {
                                    await AgendaApiService.deleteRecurringFromDate(
                                        Number(selectedEvent.id),
                                        {
                                            fromDate: moment(
                                                selectedEvent.start
                                            ).format("YYYY-MM-DD"),
                                        }
                                    );
                                }
                                setShowDeleteScopeModal(false);
                                setShowDeleteModal(false);
                                fetchData();
                            }
                        }}
                    >
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* ----------- MODAL DE CONFIRMAÇÃO DE EXCLUSÃO ------------ */}
            {showDeleteModal && (
                <Modal show onHide={() => setShowDeleteModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmar Exclusão</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Tem certeza que deseja excluir o evento{" "}
                        {eventToDelete && (
                            <strong>{getEventTitle(eventToDelete)}</strong>
                        )}
                        ?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => setShowDeleteModal(false)}
                        >
                            Cancelar
                        </Button>
                        <Button variant="danger" onClick={handleDelete}>
                            Excluir
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}

            {/* ----------- MODAL DE DETALHES ------------ */}
            <EventDetailModal
                show={showDetailModal}
                onClose={() => setShowDetailModal(false)}
                event={selectedEvent}
                getEventType={getEventType}
                getEventTitle={getEventTitle}
            />

            {/* ----------- MODAL DE EDIÇÃO ------------ */}
            {showEditModal && selectedEvent && (
                <AgendaEventEdit
                    event={selectedEvent}
                    onClose={() => setShowEditModal(false)}
                    onEventUpdated={() => {
                        fetchData();
                        setShowEditModal(false);
                        toast.success("Evento atualizado na agenda!");
                    }}
                    scope={editScope}
                    occurrenceDate={selectedEvent.start}
                />
            )}
        </div>
    );
};
