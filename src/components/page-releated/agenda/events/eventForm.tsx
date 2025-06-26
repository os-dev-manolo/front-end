/* eslint-disable no-console */
import React, { RefObject, useState } from "react";
import { Form as Unform } from "@unform/web";
import { FormHandles } from "@unform/core";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { RRule, Frequency, Options as RRuleOptions } from "rrule";
import { Checkbox, Input } from "../../../global";
import { Select } from "../../../global/select";
import { InputMultiLined } from "../../../global/input";
import { toast } from "../../../../views/gbp/agenda/imports";

interface OptionType {
    value: string;
    label: string;
}

interface EventFormProps {
    formRef: RefObject<FormHandles>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSubmit: (data: any) => void;
    iconOptions: OptionType[];
    colorOptions: OptionType[];
    peopleOptions: OptionType[];
    selectedGuests: OptionType[];
    addGuest: (guest: OptionType) => void;
    removeGuest: (guestValue: string) => void;
    scope?: "only" | "thisAndFuture" | "all";
    occurrenceDate?: Date;
}

// Use o array e a tabela de conversão conforme seu RRule!
const weekdays = [
    { name: "recurrence.weekdays.monday", label: "Seg", rruleValue: RRule.MO }, //
    { name: "recurrence.weekdays.tuesday", label: "Ter", rruleValue: RRule.TU }, // 1
    {
        name: "recurrence.weekdays.wednesday",
        label: "Qua",
        rruleValue: RRule.WE,
    }, // 2
    {
        name: "recurrence.weekdays.thursday",
        label: "Qui",
        rruleValue: RRule.TH,
    }, // 3
    { name: "recurrence.weekdays.friday", label: "Sex", rruleValue: RRule.FR }, // 4
    {
        name: "recurrence.weekdays.saturday",
        label: "Sáb",
        rruleValue: RRule.SA,
    }, // 6
    { name: "recurrence.weekdays.sunday", label: "Dom", rruleValue: RRule.SU }, // 5
];

// Helper para traduzir getDay() (JS) para weekday do seu RRule
const jsToRRule: Record<number, number> = {
    0: 5,
    1: 0,
    2: 1,
    3: 2,
    4: 3,
    5: 6,
    6: 4,
};

export const EventForm: React.FC<EventFormProps> = ({
    formRef,
    onSubmit,
    iconOptions,
    colorOptions,
    peopleOptions,
    selectedGuests,
    addGuest,
    removeGuest,
    scope,
    occurrenceDate,
}) => {
    const [guestToAdd, setGuestToAdd] = useState<OptionType | undefined>();
    const [recurrenceType, setRecurrenceType] = useState("none");

    const handleGuestChange = (newValue: unknown) => {
        const option = newValue as OptionType | null;
        setGuestToAdd(option || undefined);
    };

    const handleAddGuest = () => {
        if (guestToAdd) {
            addGuest(guestToAdd);
            setGuestToAdd(undefined);
        }
    };

    const handleRecurrenceChange = (newValue: unknown) => {
        const option = newValue as OptionType | null;
        setRecurrenceType(option?.value || "none");
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit = (data: any) => {
        const formData = { ...data };

        if (recurrenceType === "custom") {
            const recurrence = formData.recurrence || {};
            const { frequency } = recurrence;

            if (!frequency) {
                toast.error("Frequência de recorrência não selecionada.");
                return;
            }

            const interval = parseInt(recurrence.interval || "1", 10);

            // UNTIL (repetição até)
            let until;
            if (recurrence.until) {
                const endTime = formData.endDate
                    ? new Date(formData.endDate)
                    : new Date(formData.date);
                const [y, m, d] = recurrence.until.split("-").map(Number);
                until = new Date(
                    y,
                    m - 1,
                    d,
                    endTime.getHours(),
                    endTime.getMinutes(),
                    0,
                    0
                );
            }

            // Pega dias marcados (checkboxes)
            const weekdayValues = recurrence.weekdays || {};
            const byweekday = weekdays
                .filter((day) => {
                    const key = day.name.split(".").pop() || "";
                    return weekdayValues[key] === "true";
                })
                .map((day) => day.rruleValue);

            // Descobre o "start" correto para a primeira ocorrência
            const originalStart = new Date(formData.date);
            let realStart = originalStart;

            // Converter getDay() JS para seu RRULE (0=Dom,...,6=Sab)
            const jsWeek = originalStart.getDay(); // 0=Dom, 6=Sab
            const rruleWeek = jsToRRule[jsWeek];
            const selectedWeekdays = byweekday.map((wd) => wd.weekday);

            if (frequency === "weekly" && byweekday.length > 0) {
                if (!selectedWeekdays.includes(rruleWeek)) {
                    // Acha o próximo dia válido da semana
                    selectedWeekdays.sort((a, b) => a - b);
                    let daysToAdd = null;
                    // eslint-disable-next-line no-restricted-syntax
                    for (const wd of selectedWeekdays) {
                        if (wd > rruleWeek) {
                            daysToAdd = wd - rruleWeek;
                            break;
                        }
                    }
                    if (daysToAdd === null && selectedWeekdays.length) {
                        daysToAdd = 7 - rruleWeek + selectedWeekdays[0];
                    }
                    if (daysToAdd !== null) {
                        realStart = new Date(originalStart);
                        realStart.setDate(originalStart.getDate() + daysToAdd);
                        realStart.setHours(originalStart.getHours());
                        realStart.setMinutes(originalStart.getMinutes());
                        realStart.setSeconds(0);
                        realStart.setMilliseconds(0);
                    }
                }
            }

            // Garante que o end também acompanha o novo start
            let realEnd;
            if (formData.endDate) {
                const origEnd = new Date(formData.endDate);
                const durMs = origEnd.getTime() - originalStart.getTime();
                realEnd = new Date(realStart.getTime() + durMs);
            }

            // Monta RRULE
            const rruleOptions: Partial<RRuleOptions> = {
                freq: RRule[
                    frequency.toUpperCase() as keyof typeof RRule
                ] as Frequency,
                interval,
                dtstart: realStart,
                until,
            };

            if (byweekday.length > 0) {
                rruleOptions.byweekday = byweekday;
            }

            const rule = new RRule(rruleOptions);
            formData.rrule = rule.toString();

            // Aqui o segredo: seta os campos corretos!
            formData.date = realStart.toISOString();
            formData.endDate = realEnd ? realEnd.toISOString() : undefined;
            // Se você usa "start" e "end" no payload:
            formData.start = realStart.toISOString();
            if (realEnd) formData.end = realEnd.toISOString();
        }

        // DEBUG FINAL (opcional)
        console.log("🚀 Payload para onSubmit:", {
            ...formData,
            scope,
            occurrenceDate,
        });

        onSubmit({ ...formData, scope, occurrenceDate });
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

                    <div className="row-span-2 rounded flex flex-col justify-between">
                        <div className="mx-auto">
                            <div className="flex">
                                <Select
                                    label="Participantes"
                                    name="guests"
                                    options={peopleOptions}
                                    value={guestToAdd}
                                    onChange={handleGuestChange}
                                    isClearable
                                    className="flex-grow"
                                    placeholder="Selecione"
                                />
                                <div className="display-flex pr-2 pt-2">
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={
                                            <Tooltip id="add-guest-tooltip">
                                                Adicionar convidado
                                            </Tooltip>
                                        }
                                    >
                                        <Button
                                            variant="success"
                                            onClick={handleAddGuest}
                                            disabled={!guestToAdd}
                                            className="font-bold"
                                            aria-label="Adicionar convidado"
                                        >
                                            +
                                        </Button>
                                    </OverlayTrigger>
                                </div>
                            </div>
                            <div className="max-h-36 overflow-y-auto">
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
                                                        removeGuest(guest.value)
                                                    }
                                                    aria-label={`Remover ${guest.label}`}
                                                >
                                                    ×
                                                </Button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="col-span-2">
                        <InputMultiLined name="description" label="Descrição" />
                    </div>

                    <div className="col-span-3">
                        <Select
                            name="recurrence.type"
                            label="Repetir"
                            options={[
                                { value: "none", label: "Não repetir" },
                                { value: "custom", label: "Personalizado..." },
                            ]}
                            onChange={handleRecurrenceChange}
                        />
                    </div>

                    {recurrenceType === "custom" && (
                        <>
                            <div>
                                <Select
                                    name="recurrence.frequency"
                                    label="Frequência"
                                    options={[
                                        { value: "daily", label: "Todo dia" },
                                        {
                                            value: "weekly",
                                            label: "Toda semana",
                                        },
                                        { value: "monthly", label: "Todo mês" },
                                        { value: "yearly", label: "Todo ano" },
                                    ]}
                                />
                            </div>
                            <div>
                                <Input
                                    name="recurrence.interval"
                                    label="A cada quantos?"
                                    type="number"
                                    min={1}
                                    defaultValue={1}
                                />
                            </div>
                            <div>
                                <Input
                                    name="recurrence.until"
                                    label="Repetir até"
                                    type="date"
                                />
                            </div>
                            <div className="col-span-3">
                                Dias da semana (semanal):
                                <div className="flex gap-3 flex-wrap">
                                    {weekdays.map((day) => (
                                        <Checkbox
                                            key={day.name}
                                            name={day.name}
                                            label={day.label}
                                        />
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

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
