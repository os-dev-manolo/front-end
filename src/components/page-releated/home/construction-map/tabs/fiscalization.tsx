import React from "react";
import { Col, Form, Row } from "react-bootstrap";

interface Props {
    info?: Record<string, string>;
}

export const Fiscalization: React.FC<Props> = ({ info }) => {
    if (!info) {
        return <h4>Não encontramos nenhuma informação para este banco</h4>;
    }

    return (
        <Form.Group>
            <Row>
                <h4 style={{ fontWeight: "bold" }}>FISCAL DE CONTRATO</h4>
                <Col>
                    <Form.Label>NOME</Form.Label>
                    <Form.Control value={info?.nome_fiscal} disabled />
                </Col>
                <Col>
                    <Form.Label>CARGO</Form.Label>
                    <Form.Control value={info?.cargo_fiscal} disabled />
                </Col>
            </Row>
            <br />
            <Row>
                <h4 style={{ fontWeight: "bold" }}>FISCAL DA OBRA</h4>
                <Col>
                    <Form.Label>NOME</Form.Label>
                    <Form.Control value={info?.nome_fiscal_obra} disabled />
                </Col>
                <Col>
                    <Form.Label>CARGO</Form.Label>
                    <Form.Control value={info?.cargo_fiscal_obra} disabled />
                </Col>
                <Col>
                    <Form.Label>CONSELHO</Form.Label>
                    <Form.Control value={info?.conselho_fiscal_obra} disabled />
                </Col>
            </Row>
            <br />
            <Row>
                <h4 style={{ fontWeight: "bold" }}>
                    RESPONSÁVEL TÉCNICO DA EMPRESA
                </h4>
                <Col>
                    <Form.Label>NOME</Form.Label>
                    <Form.Control value={info?.nome_er} disabled />
                </Col>
                <Col>
                    <Form.Label>CARGO</Form.Label>
                    <Form.Control value={info?.cargo_er} disabled />
                </Col>
                <Col>
                    <Form.Label>CONSELHO</Form.Label>
                    <Form.Control value={info?.conselho_er} disabled />
                </Col>
            </Row>
        </Form.Group>
    );
};
