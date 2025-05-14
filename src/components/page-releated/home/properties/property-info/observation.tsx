import React from "react";
import { Form, Row } from "react-bootstrap";

interface ObservationProps {
    observation?: string | string[];
}

export const Observation: React.FC<ObservationProps> = ({ observation }) => {
    if (!observation || !observation.length) {
        return <h4>Nenhuma observação para esta propriedade</h4>;
    }

    return (
        <>
            <Row>
                <h4>Observações</h4>
            </Row>
            <Row>
                <Form.Label>Observação</Form.Label>
                <Form.Control disabled as="textarea" value={observation} />
            </Row>
        </>
    );
};
