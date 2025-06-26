/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import "bootstrap/dist/css/bootstrap.min.css";

import { Button, Modal, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { EventsForm } from "../../../../components/page-releated/agenda/events";
import { IAgendaEvent } from "../../../../shared/interfaces/IEvent";
import { AgendaApiService } from "../../../../shared/services/api/agenda-api-service";

interface AgendaEventProps {
    onEventCreated?: (event: IAgendaEvent) => void;
}

export const AgendaEvent: React.FC<AgendaEventProps> = ({ onEventCreated }) => {
    const [show, setShow] = useState(false);

    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);

    const doAfterReset = (event?: IAgendaEvent) => {
        handleClose();
        if (event) {
            console.log(
                "📤xxxxxxxxxxxxxxxxxxxxxxx AgendaEvent repassando evento:",
                event
            ); // debug
            onEventCreated?.(event); // <- isso é essencial
        }
    };

    return (
        <>
            <div className="d-flex justify-content-end gap-5">
                <Button variant="string" color="black" onClick={handleOpen}>
                    + Novo Evento
                </Button>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                centered
                dialogClassName="modal-lg"
            >
                <Modal.Header closeButton className="position-relative">
                    <Modal.Title
                        className="position-absolute top-50 start-50 translate-middle"
                        style={{ margin: 0 }}
                    >
                        Criar Novo Evento
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EventsForm doAfterReset={doAfterReset} />
                </Modal.Body>
            </Modal>
        </>
    );
};

interface AgendaEventEditProps {
    event: IAgendaEvent;
    scope: "only" | "thisAndFuture" | "all";
    onClose: () => void;
    onEventUpdated: (updatedEvent: IAgendaEvent) => void;
}

export const AgendaEventEdit: React.FC<AgendaEventEditProps> = ({
    event,
    onClose,
    scope,
    onEventUpdated,
}) => {
    const [loading, setLoading] = useState(true);
    const [eventWithMembers, setEventWithMembers] =
        useState<IAgendaEvent | null>(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                // Pega membros do próprio evento (não importa id, só importa que é o certo)
                const response = await AgendaApiService.getEventMembers(
                    Number(event.id)
                );
                const memberIds = response.data.map((pessoa: any) => pessoa.id);
                setEventWithMembers({ ...event, members: memberIds });
            } catch (err) {
                console.error("Erro ao buscar membros do evento:", err);
                setEventWithMembers(event);
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, [event]);

    if (loading || !eventWithMembers) {
        return (
            <Modal show onHide={onClose} centered dialogClassName="modal-lg">
                <Modal.Body className="text-center py-5">
                    <Spinner animation="border" />
                </Modal.Body>
            </Modal>
        );
    }

    const handleEventUpdate = (updatedEvent: IAgendaEvent) => {
        onEventUpdated(updatedEvent);
        onClose();
    };

    // Para "Editar Todos", o occurrenceDate tem que ser SEMPRE o início real da série.
    // (event.start é sempre o início real daquela parte da série, mesmo após split)
    let editOccurrenceDate: Date | undefined;
    if (event.start) {
        editOccurrenceDate = new Date(event.start);
    }

    return (
        <Modal show onHide={onClose} centered dialogClassName="modal-lg">
            <Modal.Header closeButton>
                <Modal.Title>Editar Evento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <EventsForm
                    initialData={eventWithMembers}
                    doAfterReset={onClose}
                    onEventUpdated={handleEventUpdate}
                    scope={scope}
                    occurrenceDate={editOccurrenceDate}
                />
            </Modal.Body>
        </Modal>
    );
};
