import "bootstrap/dist/css/bootstrap.min.css";

import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { EventsForm } from "../../../../components/page-releated/agenda/events";

export const AgendaEvent = () => {
    const [show, setShow] = useState(false);

    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);

    const doAfterReset = () => {
        handleClose();
    };

    return (
        <>
            <div className="d-flex justify-content-end mb-3">
                <Button variant="primary" onClick={handleOpen}>
                    Novo Evento
                </Button>
            </div>

            <Modal show={show} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Criar Novo Evento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EventsForm doAfterReset={doAfterReset} />
                </Modal.Body>
            </Modal>
        </>
    );
};
