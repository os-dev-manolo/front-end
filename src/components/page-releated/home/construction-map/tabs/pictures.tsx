import React from "react";
import { Form, Row } from "react-bootstrap";

interface Props {
    info?: Record<string, string>;
}

export const Pictures: React.FC<Props> = ({ info }) => {
    if (!info) {
        return <h4>Não encontramos nenhuma informação para este banco</h4>;
    }

    return (
        <Form.Group>
            <Row>
                <h4 style={{ fontWeight: "bold" }}>Fotos da Obra</h4>
            </Row>
        </Form.Group>
    );
};
