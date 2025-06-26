/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
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
import { generateRRuleInstances } from "./rrule-instances";

const localizer = momentLocalizer(moment);

export const Agenda: React.FC = () => {
    const { filters, setFilters } = useFilters();
    const { setLoading } = useContext(LoadingContext);
    const [dateRange, setDateRange] = useState(() => ({
        start: moment().startOf("month").toDate(),
        end: moment().endOf("month").toDate(),
    }));
    const [editScope, setEditScope] = useState<
        "only" | "thisAndFuture" | "all"
    >("all");
    const [deleteScope] = useState<"only" | "thisAndFuture" | "all">("all");

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
        const icons = tags.map((tag) => iconMap[tag]).filter(Boolean);

        // ♾️ se recorrente
        if (rrule) icons.push("🔗");
        // 👥 se tem participantes
        if (members && members.length > 0) icons.push("👥");
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
                    event.rrule,
                    event.members
                );
                if (icons.length === 0) return filters[""];
                return icons.some((icon) => filters[icon]);
            });
    }, [typedEvents, filters, dateRange]);

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
                members: Array.isArray(e.members) ? e.members : [], // <--- ESSA LINHA GARANTE!
            }));

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

            setEventos([...events, ...birthdays]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Inicializa com o mês atual
        onNavigate(new Date());
    }, []);

    useEffect(() => {
        fetchData();
    }, [dateRange]);

    const eventPropGetter = (event: IAgendaTypedEvent) => {
        const { colorLetter } = parseEventTitle(
            event.title,
            event.rrule,
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

    const handleEdit = (scope: "only" | "thisAndFuture" | "all") => {
        setEditScope(scope);
        setShowEditModal(true);
        setMenuVisible(false);
    };

    const handleDelete = async (scope: "only" | "thisAndFuture" | "all") => {
        if (!selectedEvent) return;
        const id = String(selectedEvent.id).split("-")[0];
        const date = moment(selectedEvent.start).toISOString();

        try {
            await AgendaApiService.deleteEvent(Number(id), {
                scope,
                date,
            });
            toast.success("Evento deletado!");
            fetchData(); // 🔥 Atualiza os eventos na tela SEMPRE após exclusão
        } catch (error) {
            toast.error("Erro ao deletar evento.");
        } finally {
            setMenuVisible(false);
        }
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

    const handleConfirmDelete = async () => {
        if (!eventToDelete) return;

        const baseId = String(eventToDelete.id).split("-")[0];
        const eventDate = moment(eventToDelete.start).toISOString();

        try {
            await AgendaApiService.deleteEvent(Number(baseId), {
                scope: deleteScope,
                date: eventDate,
            });

            // Sempre recarrega do backend após qualquer delete/split!
            await fetchData();

            toast.success("Evento excluído com sucesso!");
        } catch (err) {
            console.error(err);
            toast.error("Erro ao excluir o evento.");
        } finally {
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

    function isFirstOccurrence(event: IAgendaTypedEvent) {
        if (!event.rrule) return false;
        try {
            const rule = rrulestr(event.rrule);
            const occurrences = rule.all();
            if (!occurrences.length) return false;
            const thisEventTime = new Date(event.start).getTime();
            const firstOccurrenceTime = occurrences[0].getTime();
            return thisEventTime === firstOccurrenceTime;
        } catch (e) {
            return false;
        }
    }

    function isLastOccurrence(event: IAgendaTypedEvent) {
        if (!event.rrule) return false;
        try {
            const rule = rrulestr(event.rrule);
            const occurrences = rule.all();
            if (!occurrences.length) return false;
            const thisEventTime = new Date(event.start).getTime();
            const lastOccurrenceTime =
                occurrences[occurrences.length - 1].getTime();
            return thisEventTime === lastOccurrenceTime;
        } catch (e) {
            return false;
        }
    }

    const toggleFilter = (icon: string) => {
        setFilters((prev) => ({ ...prev, [icon]: !prev[icon] }));
    };

    const getEventTitle = (event: IAgendaTypedEvent) => {
        const { icons, text } = parseEventTitle(
            event.title,
            event.rrule,
            event.members
        );
        return `${icons.join(" ")} ${text}`.trim();
    };

    const getEventType = (event: IAgendaTypedEvent) => {
        const { icons } = parseEventTitle(
            event.title,
            event.rrule,
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
        const tooltip = [text, ...icons.map((i) => iconDescriptions[i])]
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
                    // Evento temporário
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
                        // ⬇️ Cria evento com membros já juntos (sem chamada separada de addEventMembers!)
                        const result = await AgendaApiService.createEvent(
                            newEvent
                        );

                        // result.members já vem certo do backend
                        const savedEvent = {
                            ...result,
                            start: new Date(result.start),
                            end: new Date(result.end),
                            members: Array.isArray(result.members)
                                ? result.members
                                : [], // <-- GARANTE
                        };

                        // Instâncias de recorrência
                        const instances = generateRRuleInstances(
                            savedEvent,
                            dateRange
                        );

                        const eventsToAdd =
                            instances.length > 0
                                ? instances.map((ev) => ({
                                      ...ev,
                                      members: savedEvent.members, // <-- Sempre propaga os membros!
                                  }))
                                : [
                                      {
                                          ...savedEvent,
                                          id: String(savedEvent.id),
                                          type: "event",
                                          allDay: !!savedEvent.allday,
                                          originalId: undefined,
                                      },
                                  ];

                        setEventos((prev) => [
                            ...prev.filter((ev) => ev.id !== tempId),
                            ...eventsToAdd,
                        ]);
                        await AgendaApiService.createEvent(newEvent);
                        await fetchData(); // <--- Força reload do backend!

                        toast.success("Evento criado com sucesso!");
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

                    {selectedEvent?.rrule ? (
                        // Evento recorrente: mostra opções de escopo
                        <>
                            <Dropdown className="w-100 mb-1">
                                <Dropdown.Toggle
                                    variant="outline-primary"
                                    className="w-100"
                                >
                                    📝 Editar
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        onClick={() => handleEdit("only")}
                                    >
                                        Somente este
                                    </Dropdown.Item>
                                    {/* Só exibe "Este e os futuros" se NÃO for primeira nem última */}
                                    {!isFirstOccurrence(selectedEvent) &&
                                        !isLastOccurrence(selectedEvent) && (
                                            <Dropdown.Item
                                                onClick={() =>
                                                    handleEdit("thisAndFuture")
                                                }
                                            >
                                                Este e os futuros
                                            </Dropdown.Item>
                                        )}
                                    <Dropdown.Item
                                        onClick={() => handleEdit("all")}
                                    >
                                        Todos
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <Dropdown className="w-100">
                                <Dropdown.Toggle
                                    variant="outline-danger"
                                    className="w-100"
                                >
                                    ❌ Excluir
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        onClick={() => handleDelete("only")}
                                    >
                                        Somente este
                                    </Dropdown.Item>
                                    {/* Só exibe "Este e os futuros" se NÃO for primeira nem última */}
                                    {!isFirstOccurrence(selectedEvent) &&
                                        !isLastOccurrence(selectedEvent) && (
                                            <Dropdown.Item
                                                onClick={() =>
                                                    handleDelete(
                                                        "thisAndFuture"
                                                    )
                                                }
                                            >
                                                Este e os futuros
                                            </Dropdown.Item>
                                        )}
                                    <Dropdown.Item
                                        onClick={() => handleDelete("all")}
                                    >
                                        Todos
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </>
                    ) : (
                        // Evento único: editar/excluir direto
                        <>
                            <Button
                                variant="outline-primary"
                                className="w-100 mb-1"
                                onClick={() => {
                                    setShowEditModal(true);
                                    setMenuVisible(false);
                                }}
                            >
                                📝 Editar
                            </Button>
                            <Button
                                variant="outline-danger"
                                className="w-100"
                                onClick={() => {
                                    setEventToDelete(selectedEvent);
                                    setShowDeleteModal(true);
                                    setMenuVisible(false);
                                }}
                            >
                                ❌ Excluir
                            </Button>
                        </>
                    )}
                </div>
            )}

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
                        <Button variant="danger" onClick={handleConfirmDelete}>
                            Excluir
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}

            <EventDetailModal
                show={showDetailModal}
                onClose={() => setShowDetailModal(false)}
                event={selectedEvent}
                getEventType={getEventType}
                getEventTitle={getEventTitle}
            />

            {showEditModal && selectedEvent && (
                <AgendaEventEdit
                    scope={editScope}
                    event={selectedEvent}
                    onClose={() => setShowEditModal(false)}
                    onEventUpdated={() => {
                        // ⚠️ Recarrega tudo sempre após editar split/salvar!
                        fetchData();
                        setShowEditModal(false);
                        toast.success("Evento atualizado na agenda!");
                    }}
                />
            )}
        </div>
    );
};
