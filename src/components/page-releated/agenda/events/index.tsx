/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FormHandles } from "@unform/core";
import { RRule, Frequency, Weekday } from "rrule";
import { showToast } from "../../../global/toast";
import { IAgendaEvent } from "../../../../shared/interfaces/IEvent";
import {
    colorLetterMap,
    colorMapReverse,
    colorOptions,
    iconOptions,
} from "../../../../views/gbp/agenda/colors-icons-desc";
import { EventForm } from "./eventForm";
import { semvApi } from "../../../../shared/services/axios/apis.service";

// --- AUX: Monta RRULE string a partir dos campos do form
const freqMap: Record<string, Frequency> = {
    daily: Frequency.DAILY,
    weekly: Frequency.WEEKLY,
    monthly: Frequency.MONTHLY,
    yearly: Frequency.YEARLY,
};

const weekDayMap: Record<string, Weekday> = {
    MO: new Weekday(0),
    TU: new Weekday(1),
    WE: new Weekday(2),
    TH: new Weekday(3),
    FR: new Weekday(4),
    SA: new Weekday(5),
    SU: new Weekday(6),
};

function buildRRule(form: any): string | undefined {
    if (!form || form.recurrenceType === "none") return undefined;

    const freq = freqMap[form.recurrenceType];
    if (!freq) return undefined;

    const options: any = {
        freq,
        interval: Number(form.recurrenceInterval) || 1,
        dtstart: form.date ? new Date(form.date) : undefined,
    };

    if (form.recurrenceType === "weekly" && form.rruleDays?.length) {
        options.byweekday = form.rruleDays.map((d: string) => weekDayMap[d]).filter(Boolean);
    }
    if (form.recurrenceEndType === "onDate" && form.recurrenceEndDate) {
        options.until = new Date(form.recurrenceEndDate);
    }
    if (form.recurrenceEndType === "count" && form.recurrenceCount) {
        options.count = Number(form.recurrenceCount);
    }

    try {
        return new RRule(options).toString();
    } catch (e) {
        return undefined;
    }
}

// --- Componente principal
interface FormProps {
    doAfterReset(event?: IAgendaEvent): void;
    initialData?: IAgendaEvent;
    onEventUpdated?(updatedEvent: IAgendaEvent): void;
}

export const EventsForm: React.FC<FormProps> = ({
    doAfterReset,
    initialData,
    onEventUpdated,
}) => {
    const formRef = useRef<FormHandles>(null);
    const [, setLoading] = useState<boolean>(false);
    const [peopleOptions, setPeopleOptions] = useState<
        { value: string; label: string }[]
    >([]);

    // Função auxiliar para separar info do title composto
    const parseTitle = (fullTitle: string) => {
        const colorLetter = fullTitle.charAt(0);
        const notifyIcon = fullTitle.charAt(1);
        const iconPart = fullTitle.charAt(2);
        const title = fullTitle.substring(4);
        const color = colorMapReverse[colorLetter] || "";
        const notifyOnDate = notifyIcon === "#" ? "true" : "false";
        return { color, notifyOnDate, icon: iconPart, title };
    };

    // Carrega pessoas para autocomplete de convidados
    useEffect(() => {
        async function loadPeople() {
            try {
                const { data } = await semvApi.get("/event/pessoa-fisica");
                const opts = data.data.map((p: any) => ({
                    value: String(p.id),
                    label: p.nome,
                }));
                setPeopleOptions(opts);
            } catch (err) {
                showToast({
                    type: "error",
                    message: "Erro ao carregar convidados",
                });
            }
        }
        loadPeople();
    }, []);

    const onSubmit = useCallback(
        async (form: any) => {
            const startDate = form.date ? new Date(form.date) : undefined;
            let endDate = form.endDate ? new Date(form.endDate) : undefined;

            if (!startDate) {
                showToast({
                    type: "error",
                    message: "Data de início é obrigatória",
                });
                return;
            }
            if (!endDate) {
                endDate = new Date(startDate);
                endDate.setHours(endDate.getHours() + 1);
            }
            if (endDate < startDate) {
                showToast({
                    type: "error",
                    message:
                        "A data de término não pode ser anterior à data de início.",
                });
                return;
            }

            const colorLetter = colorLetterMap[form.color || ""] || "0";
            const notifyIcon = form.notifyOnDate === "true" ? "#" : "0";
            const iconPart = form.icon || "0";
            const composedTitle = `${colorLetter}${notifyIcon}${iconPart} ${form.title.trim()}`;
            const members = form.members ?? [];

            const rrule = buildRRule(form);

            const payload: IAgendaEvent = {
                title: composedTitle,
                allday: String(form.allday),
                start: startDate,
                end: endDate,
                color: form.color,
                description: form.description,
                members,
                rrule: rrule || undefined,
            };

            try {
                setLoading(true);

                let eventResult: IAgendaEvent;
                if (initialData && initialData.id) {
                    const realId = parseInt(
                        String(initialData.id).split("-")[0],
                        10
                    );
                    const response = await semvApi.put(
                        `/agenda/event/${realId}`,
                        payload
                    );
                    eventResult = response.data;
                    showToast({
                        type: "success",
                        message: "Evento e membros atualizados com sucesso",
                    });
                    doAfterReset(eventResult);
                    onEventUpdated?.(eventResult);
                } else {
                    const response = await semvApi.post(
                        "/agenda/event/new",
                        payload
                    );
                    eventResult = response.data;
                    eventResult.members = Array.isArray(eventResult.members)
                        ? eventResult.members
                        : [];
                    showToast({
                        type: "success",
                        message: "Evento criado com sucesso",
                    });
                    doAfterReset(eventResult);
                    onEventUpdated?.(eventResult);
                }
            } catch (error: any) {
                showToast({
                    type: "error",
                    message: `Erro ao processar evento: ${
                        error?.response?.data?.message || error?.message
                    }`,
                });
            } finally {
                setLoading(false);
            }
        },
        [doAfterReset, initialData, onEventUpdated]
    );

    // Inicializa os dados do evento no formulário
    const getParsedInitialData = () => {
        if (!initialData) return undefined;
        const { color, notifyOnDate, icon, title } = parseTitle(
            initialData.title
        );
        return {
            ...initialData,
            icon,
            color,
            notifyOnDate,
            title,
            allDay: initialData.allday === "true" || initialData.allday,
            start: initialData.start,
            end: initialData.end,
        };
    };

    return (
        <EventForm
            formRef={formRef}
            onSubmit={onSubmit}
            iconOptions={iconOptions}
            colorOptions={colorOptions}
            peopleOptions={peopleOptions}
            initialData={getParsedInitialData()}
        />
    );
};
