import React, { useCallback, useRef, useState } from "react";

import { FiLock } from "react-icons/fi";

import { Form as Unform } from "@unform/web";
import { FormHandles } from "@unform/core";
import { Button } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { MdTextSnippet, MdTitle } from "react-icons/md";
import { showToast } from "../../../global/toast";
import { Checkbox, DatePicker, Input, MainButton } from "../../../global";
import { SingleDatePicker } from "../../../global/event-date-picker";
import { UserService } from "../../../../shared/services/api/user-api.service";
import { AgendaApiService } from "../../../../shared/services/api/agenda-api-service";
import { IAgendaEvent } from "../../../../shared/interfaces/IEvent";
import { InputMultiLined } from "../../../global/input";

interface FormProps {
    doAfterReset(): void;
}

export const EventsForm: React.FC<FormProps> = ({ doAfterReset }) => {
    const formRef = useRef<FormHandles>(null);

    const [loading, setLoading] = useState<boolean>(false);

    const onSubmit = useCallback(
        async (form: {
            title: string;
            allday: string;
            date: { startAt: Date };
        }) => {
            const event: IAgendaEvent = {
                title: form.title,
                allday: form.allday,
                start: form.date.startAt,
                end: form.date.startAt,
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
            } catch (err) {
                // ApiErrorHandler(err);
                // const validationError = yupValidation(err);
                // formRef.current?.setErrors(validationError);
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
                <SingleDatePicker name="date" />
            </div>
            <hr />
            <div className="flex flex space-x-4">
                <Button variant="primary" type="submit">
                    SALVAR
                </Button>
                <hr />
                <br />
                <Button
                    className="btn-secondary flex items-center"
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
