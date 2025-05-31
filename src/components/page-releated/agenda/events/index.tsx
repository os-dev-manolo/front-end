import React, { useCallback, useEffect, useRef, useState } from "react";
import { Form as Unform } from "@unform/web";
import { FormHandles } from "@unform/core";
import { Button } from "react-bootstrap";

import { showToast } from "../../../global/toast";
import { Checkbox, Input } from "../../../global";
import { SingleDatePicker } from "../../../global/event-date-picker";
import { Select } from "../../../global/select";
import { AgendaApiService } from "../../../../shared/services/api/agenda-api-service";
import { IAgendaEvent } from "../../../../shared/interfaces/IEvent";
import { InputMultiLined } from "../../../global/input";

interface FormProps {
    doAfterReset(): void;
    event?: IAgendaEvent | null; // Evento opcional para edição
}

const colorLetterMap: Record<string, string> = {
    blue: "b",
    red: "r",
    green: "g",
    orange: "o",
    purple: "p",
};

export const EventsForm: React.FC<FormProps> = ({ doAfterReset, event }) => {
    const formRef = useRef<FormHandles>(null);
    const [, setLoading] = useState<boolean>(false);

    const isEditing = Boolean(event?.id);

    useEffect(() => {
        if (event) {
            const colorLetter = event.title.charAt(0);
            const color = Object.entries(colorLetterMap).find(
                ([, letter]) => letter === colorLetter
            )?.[0];

            const notifyOnDate = event.title.includes("#");

            const iconMatch = event.title.match(/[@!%*]/);
            const icon = iconMatch ? iconMatch[0] : "";

            const title = event.title
                .replace(/^[a-z]?[#]?[@!%*]?\s*/, "")
                .trim();

            formRef.current?.setData({
                title,
                description: event.description || "",
                color,
                notifyOnDate,
                icon,
                allday: event.allday,
                date: { startAt: new Date(event.start) },
                endDate: { endAt: new Date(event.end) },
            });
        }
    }, [event]);

    const onSubmit = useCallback(
        async (form: {
            color: string | undefined;
            notifyOnDate: boolean;
            title: string;
            description: string;
            allday: string;
            icon: string;
            date: { startAt: Date };
            endDate: { endAt: Date };
        }) => {
            const startDate = form.date?.startAt;
            let endDate = form.endDate?.endAt;

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

            const colorLetter = colorLetterMap[form.color || ""] || "";
            const iconPart = form.icon || "";
            const notifyIcon = form.notifyOnDate ? "#" : "";

            const composedTitle = `${colorLetter}${notifyIcon}${iconPart} ${form.title}`;

            const payload: IAgendaEvent = {
                title: composedTitle,
                allday: form.allday,
                start: startDate,
                end: endDate,
                members: "",
                color: form.color,
                description: form.description,
            };

            try {
                setLoading(true);

                if (isEditing && event?.id) {
                    await AgendaApiService.updateEvent(event.id, payload);
                    showToast({
                        type: "success",
                        message: "Evento atualizado com sucesso",
                    });
                } else {
                    await AgendaApiService.createEvent(payload);
                    showToast({
                        type: "success",
                        message: "Evento criado com sucesso",
                    });
                }

                doAfterReset();
            } finally {
                setLoading(false);
            }
        },
        [doAfterReset, event, isEditing]
    );

    const handleCancel = () => {
        doAfterReset();
    };

    const handleDelete = async () => {
        if (event?.id) {
            try {
                setLoading(true);
                await AgendaApiService.deleteEvent(event.id);
                showToast({
                    type: "success",
                    message: "Evento excluído com sucesso",
                });
                doAfterReset();
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <Unform ref={formRef} onSubmit={onSubmit}>
            <span className="font-bold">
                {isEditing ? "EDITAR EVENTO" : "NOVO EVENTO"}
            </span>
            <hr />

            <Input name="title" type="text" label="Título" />
            <InputMultiLined name="description" type="text" label="Descrição" />

            <div className="w-1/3 h-1/3 mt-3">
                <Checkbox name="allday" label="O DIA TODO" />
            </div>

            <div className="mt-3">
                <SingleDatePicker name="date" label="Início" />
                <SingleDatePicker name="endDate" label="Término" />
            </div>

            <div className="mt-3">
                <Select
                    name="icon"
                    label="Ícone do Evento (Opcional)"
                    options={[
                        { value: "", label: "Nenhum" },
                        { value: "@", label: "💼 Reunião" },
                        { value: "*", label: "🎂 Aniversário" },
                        { value: "%", label: "🎯 Meta" },
                        { value: "!", label: "⚠️ Importante" },
                    ]}
                />
            </div>

            <Select
                name="color"
                label="Cor do Evento"
                options={[
                    { value: "blue", label: "Azul" },
                    { value: "red", label: "Vermelho" },
                    { value: "green", label: "Verde" },
                    { value: "orange", label: "Laranja" },
                    { value: "purple", label: "Roxo" },
                ]}
            />

            <Checkbox
                name="notifyOnDate"
                label="Notificar no dia do evento (WhatsApp)"
            />

            <div className="flex mt-4 space-x-4">
                <Button variant="primary" type="submit">
                    SALVAR
                </Button>
                <Button
                    variant="secondary"
                    type="button"
                    onClick={handleCancel}
                >
                    CANCELAR
                </Button>

                {isEditing && (
                    <Button
                        variant="danger"
                        type="button"
                        onClick={handleDelete}
                    >
                        EXCLUIR
                    </Button>
                )}
            </div>

            <div className="mt-3 h-10" />
            <hr />
        </Unform>
    );
};
