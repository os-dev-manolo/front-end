import React from "react";
import { Col, Form, Row } from "react-bootstrap";

interface Props {
    info?: Record<string, string>;
}

export const General: React.FC<Props> = ({ info }) => {
    if (!info) {
        return <h4>Não encontramos nenhuma informação para este banco</h4>;
    }

    return (
        <Form.Group>
            <Col>
                <Form.Label style={{ fontWeight: "bold" }}>
                    NOME DA OBRA
                </Form.Label>
                <Form.Control value={info?.nome_da_obra} disabled />
            </Col>

            <Col>
                <Form.Label style={{ fontWeight: "bold" }}>OBJETO</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={2}
                    value={info?.objeto}
                    disabled
                />
            </Col>
            <Row>
                <Col>
                    <Form.Label style={{ fontWeight: "bold" }}>OBRA</Form.Label>
                    <Form.Control value={info?.obra} disabled />
                </Col>
                <Col>
                    <Form.Label style={{ fontWeight: "bold" }}>
                        SETOR
                    </Form.Label>
                    <Form.Control value={info?.setor} disabled />
                </Col>
            </Row>
            <Col>
                <Form.Label style={{ fontWeight: "bold" }}>SITUAÇÃO</Form.Label>
                <Form.Control value={info?.situacao} disabled />
            </Col>
            <Row>
                <Col>
                    <Form.Label style={{ fontWeight: "bold" }}>
                        INÍCIO DA OBRA
                    </Form.Label>
                    <Form.Control value={info?.inicio_obra} disabled />
                </Col>
                <Col>
                    <Form.Label style={{ fontWeight: "bold" }}>
                        PRAZO DE ENTREGA
                    </Form.Label>
                    <Form.Control value={info?.prazo_entrega} disabled />
                </Col>
                <Col>
                    <Form.Label style={{ fontWeight: "bold" }}>
                        DATA CONCLUSÃO
                    </Form.Label>
                    <Form.Control value={info?.data_conclusao} disabled />
                </Col>
            </Row>
            <Col>
                <Form.Label style={{ fontWeight: "bold" }}>EMPRESA</Form.Label>
                <Form.Control value={info?.empresa} disabled />
            </Col>
        </Form.Group>
    );
};
