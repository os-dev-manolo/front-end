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
            <div className="d-flex justify-content-end gap-5">
                <Button variant="string" color="black" onClick={handleOpen}>
                    + Novo Evento
                </Button>
            </div>

            <Modal show={show} onHide={handleClose} centered>
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
