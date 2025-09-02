import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useEffect, useState, useCallback } from "react";
import { EventsForm } from "../../../../components/page-releated/agenda/events";
import { IAgendaEvent } from "../../../../shared/interfaces/IEvent";
import { AgendaApiService } from "../../../../shared/services/api/agenda-api-service";

// ========== CRIAÇÃO DE EVENTO ==========
interface AgendaEventProps {
    onEventCreated?: (event: IAgendaEvent) => void;
}

export const AgendaEvent: React.FC<AgendaEventProps> = ({ onEventCreated }) => {
    const [show, setShow] = useState(false);
    const [formKey, setFormKey] = useState(0);

    // Fecha o modal só DEPOIS do sucesso
    const doAfterReset = (event?: IAgendaEvent) => {
        setShow(false);
        setFormKey((k) => k + 1);
        if (event) onEventCreated?.(event);
    };

    return (
        <>
            <div className="d-flex justify-content-end gap-5">
                <Button variant="string" onClick={() => setShow(true)}>
                    + Novo Evento
                </Button>
            </div>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                onExited={() => setFormKey((k) => k + 1)}
                centered
                dialogClassName="modal-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Criar Novo Evento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {show && (
                        <EventsForm key={formKey} doAfterReset={doAfterReset} />
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
};

// ========== EDIÇÃO DE EVENTO ==========
export interface AgendaEventEditProps {
    event: IAgendaEvent;
    onClose: () => void;
    onEventUpdated: (event?: IAgendaEvent) => void;
    scope?: "only" | "all" | "thisAndFuture";
    occurrenceDate?: Date | string; // <-- Corrigido aqui!
}

export const AgendaEventEdit: React.FC<AgendaEventEditProps> = ({
    event,
    onClose,
    onEventUpdated,
    scope,
    occurrenceDate,
}) => {
    const [loading, setLoading] = useState(true);
    const [eventWithMembers, setEventWithMembers] =
        useState<IAgendaEvent | null>(null);
    const [show, setShow] = useState(true);
    const [formKey, setFormKey] = useState(0);

    // Sempre carrega os membros quando muda o evento
    useEffect(() => {
        let mounted = true;
        setLoading(true);
        setEventWithMembers(null);
        setShow(true);
        const fetchMembers = async () => {
            try {
                const response = await AgendaApiService.getEventMembers(
                    Number(event.id)
                );
                const memberIds = response.data.map((pessoa: any) => pessoa.id);
                if (mounted)
                    setEventWithMembers({ ...event, members: memberIds });
            } catch (err) {
                if (mounted) setEventWithMembers(event);
            } finally {
                if (mounted) setLoading(false);
            }
        };
        fetchMembers();
        return () => {
            mounted = false;
        };
    }, [event]);

    // Fecha o modal só DEPOIS do submit, desmontando o form para próxima edição
    const doAfterReset = useCallback(
        (evt?: IAgendaEvent) => {
            setShow(false);
            setFormKey((k) => k + 1);
            if (evt) onEventUpdated(evt);
        },
        [onEventUpdated]
    );

    // Só desmonta o form quando o modal realmente sumiu
    const handleExited = () => {
        setEventWithMembers(null);
        setShow(false);
        onClose();
    };

    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
            onExited={handleExited}
            centered
            dialogClassName="modal-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Editar Evento
                    {scope === "only" && (
                        <span className="text-warning ms-2" style={{ fontSize: 14 }}>
                            (só esta ocorrência)
                        </span>
                    )}
                    {scope === "thisAndFuture" && (
                        <span className="text-warning ms-2" style={{ fontSize: 14 }}>
                            (desta em diante)
                        </span>
                    )}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading || !eventWithMembers ? (
                    <div className="text-center py-5">
                        <Spinner animation="border" />
                    </div>
                ) : (
                    <EventsForm
                        key={formKey}
                        initialData={eventWithMembers}
                        doAfterReset={doAfterReset}
                        onEventUpdated={onEventUpdated}
                        scope={scope}
                        occurrenceDate={occurrenceDate} // <-- Corrigido aqui!
                    />
                )}
            </Modal.Body>
        </Modal>
    );
};

// ========== FormProps do EventsForm ==========
export interface FormProps {
    doAfterReset(event?: IAgendaEvent): void;
    initialData?: IAgendaEvent;
    onEventUpdated?(updatedEvent?: IAgendaEvent): void;
    scope?: "only" | "all" | "thisAndFuture";
    occurrenceDate?: Date | string; // <-- Corrigido aqui!
}
