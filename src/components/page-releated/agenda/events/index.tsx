import React, { useCallback, useRef, useState } from "react";
import { Form as Unform } from "@unform/web";
import { FormHandles } from "@unform/core";
import { Button } from "react-bootstrap";

import { showToast } from "../../../global/toast";
import { Checkbox, Input } from "../../../global";
import { Select } from "../../../global/select";
import { AgendaApiService } from "../../../../shared/services/api/agenda-api-service";
import { IAgendaEvent } from "../../../../shared/interfaces/IEvent";
import { InputMultiLined } from "../../../global/input";

interface FormProps {
    doAfterReset(): void;
}

const colorLetterMap: Record<string, string> = {
    blue: "b",
    red: "r",
    green: "g",
    orange: "o",
    purple: "p",
};

export const EventsForm: React.FC<FormProps> = ({ doAfterReset }) => {
    const formRef = useRef<FormHandles>(null);
    const [, setLoading] = useState<boolean>(false);

    const onSubmit = useCallback(
        async (form: {
            color?: string;
            notifyOnDate?: string;
            title: string;
            description: string;
            allday?: string;
            icon: string;
            date: string;
            endDate: string;
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

            // ✅ Validação de data
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

            const payload: IAgendaEvent = {
                title: composedTitle,
                allday: String(form.allday),
                start: startDate,
                end: endDate,
                members: "",
                color: form.color,
                description: form.description,
            };

            try {
                setLoading(true);
                await AgendaApiService.createEvent(payload);
                showToast({
                    type: "success",
                    message: "Evento criado com sucesso",
                });
                doAfterReset();
            } finally {
                setLoading(false);
            }
        },
        [doAfterReset]
    );
    return (
        <div className="max-w-md mx-auto">
            <Unform ref={formRef} onSubmit={onSubmit}>
                <div className="grid grid-cols-2 gap-2">
                    <Input name="title" type="text" label="Título" />
                    <div className="items-center pl-2 pr-2">
                        <Checkbox name="allday" label=" Dia Todo" />
                        <Checkbox
                            name="notifyOnDate"
                            label="Notificar via WhatsApp"
                        />
                    </div>
                    <Select
                        name="icon"
                        label="Ícone"
                        options={[
                            { value: "0", label: "Nenhum" },
                            { value: "@", label: "💼 Reunião" },
                            { value: "*", label: "🎂 Aniversário" },
                            { value: "%", label: "🎯 Meta" },
                            { value: "!", label: "⚠️ Importante" },
                        ]}
                    />
                    <Select
                        name="color"
                        label="Cor"
                        options={[
                            { value: "blue", label: "🔵 Azul" },
                            { value: "red", label: "🔴 Vermelho" },
                            { value: "green", label: "🟢 Verde" },
                            { value: "orange", label: "🟠 Laranja" },
                            { value: "purple", label: "🟣 Roxo" },
                        ]}
                    />

                    <Input name="date" label="Início" type="datetime-local" />
                    <Input
                        name="endDate"
                        label="Término"
                        type="datetime-local"
                    />
                </div>

                <div className="mt-3">
                    <InputMultiLined
                        name="description"
                        type="text"
                        label="Descrição"
                    />
                </div>

                <div className="flex justify-center gap-2 mt-4">
                    <Button variant="primary" type="submit">
                        Salvar
                    </Button>
                </div>
            </Unform>
        </div>
    );
};
