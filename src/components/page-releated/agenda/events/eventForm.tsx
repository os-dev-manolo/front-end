/* eslint-disable prefer-template */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { RefObject, useEffect, useState } from "react";
import { Form as Unform } from "@unform/web";
import { FormHandles } from "@unform/core";
import { Button } from "react-bootstrap";
import { Checkbox, Input } from "../../../global";
import { Select } from "../../../global/select";
import { InputMultiLined } from "../../../global/input";

interface OptionType {
    value: string;
    label: string;
}

interface EventFormProps {
    formRef: RefObject<FormHandles>;
    onSubmit: (data: any) => void;
    iconOptions: OptionType[];
    colorOptions: OptionType[];
    peopleOptions: OptionType[];
    initialData?: any;
}

const weekDays = [
    { value: "MO", label: "Segunda" },
    { value: "TU", label: "Terça" },
    { value: "WE", label: "Quarta" },
    { value: "TH", label: "Quinta" },
    { value: "FR", label: "Sexta" },
    { value: "SA", label: "Sábado" },
    { value: "SU", label: "Domingo" },
];

const recurrenceTypes = [
    { value: "none", label: "Evento único" },
    { value: "daily", label: "Diário" },
    { value: "weekly", label: "Semanal" },
    { value: "monthly", label: "Mensal" },
    { value: "yearly", label: "Anual" },
];

const recurrenceEndTypes = [
    { value: "never", label: "Nunca" },
    { value: "onDate", label: "Em uma data" },
    { value: "count", label: "Após X repetições" },
];

// PT mapping
function mapDiaPt(d: string) {
    return (
        {
            MO: "segunda",
            TU: "terça",
            WE: "quarta",
            TH: "quinta",
            FR: "sexta",
            SA: "sábado",
            SU: "domingo",
        }[d] || d
    );
}

function formatDatePt(dt: string) {
    if (!dt) return "";
    const d = new Date(dt);
    return d.toLocaleDateString("pt-BR");
}

function getRecurrenceSummary({
    type,
    interval,
    days,
    endType,
    endDate,
    count,
}: {
    type: string;
    interval: number;
    days: string[];
    endType: string;
    endDate?: string;
    count?: number;
}) {
    if (type === "none") return "Evento único.";
    let str = "Este evento se repete ";

    if (type === "daily") {
        str += interval === 1 ? "todos os dias" : `a cada ${interval} dias`;
    } else if (type === "weekly") {
        str += interval === 1 ? "toda semana" : `a cada ${interval} semanas`;
        if (days?.length) {
            const dias = days.map(mapDiaPt).join(" e ");
            str += `, às ${dias}`;
        }
    } else if (type === "monthly") {
        str += interval === 1 ? "todo mês" : `a cada ${interval} meses`;
    } else if (type === "yearly") {
        str += interval === 1 ? "todo ano" : `a cada ${interval} anos`;
    }

    if (endType === "onDate" && endDate) {
        str += ` até ${formatDatePt(endDate)}`;
    } else if (endType === "count" && count) {
        str += ` por ${count} ocorrências`;
    }
    return str + ".";
}

export const EventForm: React.FC<EventFormProps> = ({
    formRef,
    onSubmit,
    iconOptions,
    colorOptions,
    peopleOptions,
    initialData,
}) => {
    // Participantes
    const [guestInput, setGuestInput] = useState("");
    const [selectedGuests, setSelectedGuests] = useState<OptionType[]>([]);
    const [guestsInitialized, setGuestsInitialized] = useState(false);
    const [showList, setShowList] = useState(false);

    // Recorrência
    const [recurrenceType, setRecurrenceType] = useState<string>(
        initialData?.recurrenceType || "none"
    );
    const [recurrenceInterval, setRecurrenceInterval] = useState<number>(
        initialData?.recurrenceInterval || 1
    );
    const [selectedDays, setSelectedDays] = useState<string[]>(
        initialData?.rruleDays || []
    );
    const [recurrenceEndType, setRecurrenceEndType] = useState<string>(
        initialData?.recurrenceEndType || "never"
    );
    const [recurrenceEndDate, setRecurrenceEndDate] = useState<string>(
        initialData?.recurrenceEndDate || ""
    );
    const [recurrenceCount, setRecurrenceCount] = useState<number>(
        initialData?.recurrenceCount || 1
    );
    const [summary, setSummary] = useState("Evento único.");

    // Atualiza resumo toda vez que algo muda
    useEffect(() => {
        setSummary(
            getRecurrenceSummary({
                type: recurrenceType,
                interval: recurrenceInterval,
                days: selectedDays,
                endType: recurrenceEndType,
                endDate: recurrenceEndDate,
                count: recurrenceCount,
            })
        );
    }, [
        recurrenceType,
        recurrenceInterval,
        selectedDays,
        recurrenceEndType,
        recurrenceEndDate,
        recurrenceCount,
    ]);

    useEffect(() => {
        if (initialData && peopleOptions.length > 0 && !guestsInitialized) {
            const guests =
                initialData.members?.map((id: any) => {
                    const found = peopleOptions.find(
                        (p) => p.value === String(id)
                    );
                    return found ?? { value: String(id), label: `ID: ${id}` };
                }) || [];
            setSelectedGuests(guests);
            setGuestsInitialized(true);

            const formatDt = (d?: Date | string) => {
                if (!d) return "";
                const date = typeof d === "string" ? new Date(d) : d;
                const pad = (n: number) => (n < 10 ? `0${n}` : n);
                return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
                    date.getDate()
                )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
            };
            formRef.current?.setData({
                title: initialData.title || "",
                icon: initialData.icon || "",
                color: initialData.color || "",
                allDay: initialData.allDay ?? false,
                notifyOnDate: initialData.notifyOnDate ?? false,
                date: initialData.start ? formatDt(initialData.start) : "",
                endDate: initialData.end ? formatDt(initialData.end) : "",
                description: initialData.description || "",
            });

            setRecurrenceType(initialData.recurrenceType || "none");
            setRecurrenceInterval(initialData.recurrenceInterval || 1);
            setSelectedDays(initialData.rruleDays || []);
            setRecurrenceEndType(initialData.recurrenceEndType || "never");
            setRecurrenceEndDate(initialData.recurrenceEndDate || "");
            setRecurrenceCount(initialData.recurrenceCount || 1);
        }
        if (!initialData) {
            setGuestsInitialized(false);
            setSelectedGuests([]);
            setGuestInput("");
        }
    }, [initialData, peopleOptions, guestsInitialized, formRef]);

    // AutoComplete – filtra e exibe
    const filteredOptions =
        guestInput.length > 0
            ? peopleOptions
                  .filter(
                      (opt) =>
                          opt.label
                              .toLowerCase()
                              .includes(guestInput.toLowerCase()) &&
                          !selectedGuests.some((g) => g.value === opt.value)
                  )
                  .slice(0, 20)
            : [];

    const handleAddGuest = (guest: OptionType) => {
        if (guest && !selectedGuests.some((g) => g.value === guest.value)) {
            setSelectedGuests([...selectedGuests, guest]);
            setGuestInput("");
            setShowList(false);
        }
    };

    const handleRemoveGuest = (guestValue: string) => {
        setSelectedGuests(selectedGuests.filter((g) => g.value !== guestValue));
    };

    const handleSubmit = (rawData: Record<string, any>) => {
        const data = { ...rawData };
        data.start = data.date;
        data.end = data.endDate;
        data.members = selectedGuests.map((g) => g.value);

        console.log("🎯 Enviando formulário com convidados:", data.members);
        if (recurrenceType !== "none") {
            data.recurrenceType = recurrenceType;
            data.recurrenceInterval = recurrenceInterval;
            data.rruleDays = selectedDays;
            data.recurrenceEndType = recurrenceEndType;
            data.recurrenceEndDate =
                recurrenceEndType === "onDate" ? recurrenceEndDate : undefined;
            data.recurrenceCount =
                recurrenceEndType === "count" ? recurrenceCount : undefined;
        } else {
            data.recurrenceType = "none";
            data.recurrenceInterval = 1;
            data.rruleDays = [];
            data.recurrenceEndType = "never";
            data.recurrenceEndDate = undefined;
            data.recurrenceCount = undefined;
        }

        onSubmit(data);
    };

    // Toggle dias da semana
    const toggleDay = (day: string) => {
        setSelectedDays((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
    };

    return (
        <div className="max-w-3xl mx-auto bg-white rounded shadow-md">
            <Unform ref={formRef} onSubmit={handleSubmit}>
                <div className="grid grid-cols-3">
                    <div className="col-span-3">
                        <Input name="title" type="text" label="Título" />
                    </div>
                    <div>
                        <Select
                            name="icon"
                            label="Ícone"
                            options={iconOptions}
                        />
                    </div>
                    <div>
                        <Select
                            name="color"
                            label="Cor"
                            options={colorOptions}
                        />
                    </div>
                    <div className="flex flex-col">
                        <Checkbox name="allDay" label="Dia Todo" />
                        <Checkbox
                            name="notifyOnDate"
                            label="Videoconferência"
                        />
                    </div>
                    <div>
                        <Input
                            name="date"
                            label="Início"
                            type="datetime-local"
                        />
                    </div>
                    <div>
                        <Input
                            name="endDate"
                            label="Término"
                            type="datetime-local"
                        />
                    </div>
                    {/* PARTICIPANTES */}
                    <div className="row-span-2 rounded flex flex-col">
                        <div
                            className="mx-auto w-full justify-between"
                            style={{
                                position: "relative",
                                width: "100%",
                                minWidth: "240px",
                            }}
                        >
                            <Input
                                name="guestsSearch"
                                label="👤 Participantes"
                                type="text"
                                autoComplete="off"
                                value={guestInput}
                                onChange={(e) => {
                                    setGuestInput(e.target.value);
                                    setShowList(true);
                                }}
                                onFocus={() => setShowList(true)}
                                onBlur={() =>
                                    setTimeout(() => setShowList(false), 120)
                                }
                                placeholder="Digite para buscar e adicionar"
                            />
                            {showList && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "100%",
                                        left: 0,
                                        width: "100%",
                                        background: "#fff",
                                        border: "1px solid #ccc",
                                        borderRadius: 4,
                                        zIndex: 99,
                                        maxHeight: 180,
                                        overflowY: "auto",
                                        boxSizing: "border-box",
                                        marginTop: 2,
                                    }}
                                >
                                    {filteredOptions.length > 0 ? (
                                        filteredOptions.map((opt) => (
                                            <div
                                                key={opt.value}
                                                style={{
                                                    cursor: "pointer",
                                                    padding: "8px 12px",
                                                }}
                                                className="hover:bg-light"
                                                onMouseDown={() =>
                                                    handleAddGuest(opt)
                                                }
                                            >
                                                <span
                                                    role="img"
                                                    aria-label="adicionar"
                                                    className="mr-2"
                                                >
                                                    ➕
                                                </span>
                                                {opt.label}
                                            </div>
                                        ))
                                    ) : (
                                        <div
                                            style={{
                                                padding: 8,
                                                color: "#888",
                                            }}
                                        >
                                            Nenhum resultado.
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="max-h-36 overflow-y-auto mt-2 w-full">
                            {selectedGuests.length === 0 ? (
                                <p className="text-sm text-gray-500 italic pl-2">
                                    Nenhum convidado adicionado.
                                </p>
                            ) : (
                                <ul className="pl-3">
                                    {selectedGuests.map((guest) => (
                                        <li
                                            key={guest.value}
                                            className="pr-3 flex justify-between hover:bg-gray-100 rounded"
                                        >
                                            <span>{guest.label}</span>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() =>
                                                    handleRemoveGuest(
                                                        guest.value
                                                    )
                                                }
                                                aria-label={`Remover ${guest.label}`}
                                                type="button"
                                            >
                                                ×
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className="col-span-2">
                        <InputMultiLined name="description" label="Descrição" />
                    </div>
                    {/* RECORRÊNCIA - abaixo da descrição, sem espaçamento extra */}
                    <div className="col-span-3" style={{ marginTop: 0 }}>
                        <div className="flex items-center gap-4 mb-1">
                            <label className="font-semibold">Repetição:</label>
                            <select
                                value={recurrenceType}
                                onChange={(e) =>
                                    setRecurrenceType(
                                        (e.target as HTMLSelectElement).value
                                    )
                                }
                                className="border rounded px-2 py-1"
                                style={{ height: 36 }}
                            >
                                {recurrenceTypes.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                            {recurrenceType !== "none" && (
                                <>
                                    <span>A cada</span>
                                    <input
                                        type="number"
                                        min={1}
                                        value={recurrenceInterval}
                                        onChange={(e) =>
                                            setRecurrenceInterval(
                                                Math.max(
                                                    1,
                                                    Number(
                                                        (
                                                            e.target as HTMLInputElement
                                                        ).value
                                                    )
                                                )
                                            )
                                        }
                                        className="border rounded px-1 py-1"
                                        style={{ width: 50 }}
                                    />
                                    <span>
                                        {recurrenceType === "daily"
                                            ? "dia(s)"
                                            : recurrenceType === "weekly"
                                            ? "semana(s)"
                                            : recurrenceType === "monthly"
                                            ? "mês(es)"
                                            : "ano(s)"}
                                    </span>
                                </>
                            )}
                        </div>
                        {recurrenceType === "weekly" && (
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className="font-semibold">
                                    Dias da semana:
                                </span>
                                {weekDays.map((d) => (
                                    <label key={d.value} className="mr-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedDays.includes(
                                                d.value
                                            )}
                                            onChange={() => toggleDay(d.value)}
                                        />
                                        <span className="ml-1">{d.label}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                        {recurrenceType !== "none" && (
                            <div className="flex items-center gap-3 mb-1">
                                <label className="font-semibold mb-0">
                                    Termina:
                                </label>
                                <select
                                    value={recurrenceEndType}
                                    onChange={(e) =>
                                        setRecurrenceEndType(
                                            (e.target as HTMLSelectElement)
                                                .value
                                        )
                                    }
                                    className="border rounded px-2 py-1"
                                >
                                    {recurrenceEndTypes.map((opt) => (
                                        <option
                                            key={opt.value}
                                            value={opt.value}
                                        >
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                                {recurrenceEndType === "onDate" && (
                                    <input
                                        type="date"
                                        className="border rounded px-2 py-1"
                                        value={recurrenceEndDate}
                                        onChange={(e) =>
                                            setRecurrenceEndDate(e.target.value)
                                        }
                                    />
                                )}
                                {recurrenceEndType === "count" && (
                                    <>
                                        <span>Após</span>
                                        <input
                                            type="number"
                                            min={1}
                                            className="border rounded px-1 py-1"
                                            style={{ width: 60 }}
                                            value={recurrenceCount}
                                            onChange={(e) =>
                                                setRecurrenceCount(
                                                    Math.max(
                                                        1,
                                                        Number(
                                                            (
                                                                e.target as HTMLInputElement
                                                            ).value
                                                        )
                                                    )
                                                )
                                            }
                                        />
                                        <span>ocorrências</span>
                                    </>
                                )}
                            </div>
                        )}
                        {/* Resumo dinâmico */}
                        <div className="text-gray-700 italic text-sm mt-0">
                            {summary}
                        </div>
                    </div>
                    <div className="col-span-3 text-center mb-2">
                        <Button type="submit" variant="primary" size="lg">
                            Salvar
                        </Button>
                    </div>
                </div>
            </Unform>
        </div>
    );
};
