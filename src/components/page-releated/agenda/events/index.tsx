import React, { useCallback, useRef, useState } from "react";

import { Form as Unform } from "@unform/web";
import { FormHandles } from "@unform/core";
import { Button } from "react-bootstrap";
import { showToast } from "../../../global/toast";
import { Checkbox, Input } from "../../../global";
import { SingleDatePicker } from "../../../global/event-date-picker";
import { AgendaApiService } from "../../../../shared/services/api/agenda-api-service";
import { IAgendaEvent } from "../../../../shared/interfaces/IEvent";
import { InputMultiLined } from "../../../global/input";

interface FormProps {
    doAfterReset(): void;
}

export const EventsForm: React.FC<FormProps> = ({ doAfterReset }) => {
    const formRef = useRef<FormHandles>(null);
    const [, setLoading] = useState<boolean>(false);

    const onSubmit = useCallback(
        async (form: {
            title: string;
            allday: string;
            date: { startAt: Date };
            endDate: { endAt: Date };
        }) => {
            const startDate = form.date?.startAt;
            let endDate = form.endDate?.endAt;

            // Se não preencheu o fim, soma 1h
            if (!endDate) {
                endDate = new Date(startDate);
                endDate.setHours(endDate.getHours() + 1);
            }

            const event: IAgendaEvent = {
                title: form.title,
                allday: form.allday,
                start: startDate,
                end: endDate,
                members: "",
            };

            try {
                setLoading(true);

                await AgendaApiService.createEvent(event);

                showToast({
                    type: "success",
                    message: "Evento cadastrado com sucesso",
                });

                doAfterReset();
            } finally {
                setLoading(false);
            }
        },
        [doAfterReset]
    );

    const handleCancel = () => {
        doAfterReset();
    };

    return (
        <Unform ref={formRef} onSubmit={onSubmit}>
            <span>NOVO EVENTO</span>
            <hr />
            <Input name="title" type="text" label="Título" />
            <hr />
            <InputMultiLined name="description" type="text" label="Descrição" />
            <hr />
            <div className="w-1/3 h-1/3">
                <Checkbox name="allday" label="O DIA TODO" />
            </div>
            <hr />
            <div>
                <SingleDatePicker name="date" label="Início" />
                <SingleDatePicker name="endDate" label="Término" />
            </div>
            <hr />
            <div className="flex flex space-x-4">
                <Button variant="primary" type="submit">
                    SALVAR
                </Button>
                <Button
                    className="btn-secondary"
                    type="button"
                    onClick={handleCancel}
                >
                    CANCELAR
                </Button>
            </div>
            <div className="mt-3 h-10" />
            <hr />
        </Unform>
    );
};
