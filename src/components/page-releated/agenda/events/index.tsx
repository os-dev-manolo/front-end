/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FormHandles } from "@unform/core";
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

interface FormProps {
    doAfterReset(event?: IAgendaEvent): void;
    initialData?: IAgendaEvent;
    onEventUpdated?(updatedEvent: IAgendaEvent): void;
    scope?: "only" | "thisAndFuture" | "all";
    occurrenceDate?: Date;
}

export const EventsForm: React.FC<FormProps> = ({
    doAfterReset,
    initialData,
    onEventUpdated,
    scope,
    occurrenceDate,
}) => {
    const formRef = useRef<FormHandles>(null);
    const [, setLoading] = useState<boolean>(false);
    const [peopleOptions, setPeopleOptions] = useState<
        { value: string; label: string }[]
    >([]);
    const [selectedGuests, setSelectedGuests] = useState<
        { value: string; label: string }[]
    >([]);

    // Formata datetime-local
    const formatDateTimeLocal = (date?: Date) => {
        if (!date) return "";
        const d = new Date(date);
        const pad = (n: number) => (n < 10 ? `0${n}` : n);
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
            d.getDate()
        )}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    };

    // Parse do title pra remontar formulário
    const parseTitle = (fullTitle: string) => {
        const colorLetter = fullTitle.charAt(0);
        const notifyIcon = fullTitle.charAt(1);
        const iconPart = fullTitle.charAt(2);
        const title = fullTitle.substring(4);
        const color = colorMapReverse[colorLetter] || "";
        const notifyOnDate = notifyIcon === "#" ? "true" : "false";
        return { color, notifyOnDate, icon: iconPart, title };
    };

    // Carrega opções de convidados
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

    // Preenche formulário quando abre
    useEffect(() => {
        if (initialData && peopleOptions.length > 0 && formRef.current) {
            const { color, notifyOnDate, icon, title } = parseTitle(
                initialData.title
            );

            formRef.current.setData({
                title,
                notifyOnDate,
                icon,
                color,
                date: formatDateTimeLocal(initialData.start),
                endDate: formatDateTimeLocal(initialData.end),
                description: initialData.description || "",
                members: initialData.members || [],
            });

            // Monta convidados já selecionados
            const guests =
                initialData.members?.map((id) => {
                    const found = peopleOptions.find(
                        (p) => p.value === String(id)
                    );
                    return found ?? { value: String(id), label: `ID: ${id}` };
                }) || [];
            setSelectedGuests(guests);
        }
    }, [initialData, peopleOptions]);

    const addGuest = (guest: { value: string; label: string }) => {
        if (!selectedGuests.some((g) => g.value === guest.value)) {
            setSelectedGuests([...selectedGuests, guest]);
        }
    };

    const removeGuest = (guestValue: string) => {
        setSelectedGuests(selectedGuests.filter((g) => g.value !== guestValue));
    };

    const onSubmit = useCallback(
        async (form: {
            rrule?: string;
            color?: string;
            notifyOnDate?: string;
            title: string;
            description: string;
            allday?: boolean | string;
            icon: string;
            date: string;
            endDate: string;
            members?: string[];
            scope?: "only" | "thisAndFuture" | "all";
            occurrenceDate?: string | Date;
        }) => {
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
            const members = selectedGuests.map((g) => g.value);

            const payload: IAgendaEvent & {
                scope?: "only" | "thisAndFuture" | "all";
                occurrenceDate?: string;
            } = {
                title: composedTitle,
                allday: String(form.allday),
                start: startDate,
                end: endDate,
                color: form.color,
                description: form.description,
                members,
                rrule: form.rrule || undefined,
            };

            if (form.scope) payload.scope = form.scope;
            if (form.occurrenceDate) {
                payload.occurrenceDate =
                    form.occurrenceDate instanceof Date
                        ? form.occurrenceDate.toISOString()
                        : form.occurrenceDate;
            }

            try {
                setLoading(true);

                let eventResult: IAgendaEvent;

                if (initialData && initialData.id) {
                    // Atualiza evento existente
                    const realId = parseInt(
                        String(initialData.id).split("-")[0],
                        10
                    );

                    const response = await semvApi.put(
                        `/agenda/event/${realId}`,
                        payload
                    );
                    eventResult = response.data;

                    // Blindagem: checa campos obrigatórios
                    if (
                        !eventResult ||
                        !eventResult.id ||
                        !eventResult.start ||
                        !eventResult.end
                    ) {
                        showToast({
                            type: "error",
                            message:
                                "Resposta inesperada do backend ao atualizar evento.",
                        });
                        console.error("Resposta inesperada:", eventResult);
                        doAfterReset();
                        return;
                    }

                    showToast({
                        type: "success",
                        message: "Evento e membros atualizados com sucesso",
                    });

                    doAfterReset(eventResult);
                    onEventUpdated?.(eventResult);
                } else {
                    // Criação
                    const response = await semvApi.post(
                        "/agenda/event/new",
                        payload
                    );
                    eventResult = response.data;

                    // Blindagem: checa campos obrigatórios
                    if (
                        !eventResult ||
                        !eventResult.id ||
                        !eventResult.start ||
                        !eventResult.end
                    ) {
                        showToast({
                            type: "error",
                            message:
                                "Resposta inesperada do backend ao criar evento.",
                        });
                        console.error("Resposta inesperada:", eventResult);
                        doAfterReset();
                        return;
                    }

                    // Garante que members é sempre array
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
                console.error("❌ Erro ao salvar evento:", {
                    message: error?.message,
                    response: error?.response?.data,
                    status: error?.response?.status,
                });
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
        [doAfterReset, initialData, onEventUpdated, selectedGuests]
    );

    return (
        <EventForm
            formRef={formRef}
            onSubmit={onSubmit}
            iconOptions={iconOptions}
            colorOptions={colorOptions}
            peopleOptions={peopleOptions}
            selectedGuests={selectedGuests}
            addGuest={addGuest}
            removeGuest={removeGuest}
            scope={scope}
            occurrenceDate={occurrenceDate}
        />
    );
};
