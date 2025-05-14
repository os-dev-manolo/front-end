import React from "react";
import { Col, Form, Row } from "react-bootstrap";

interface Props {
    info?: Record<string, string>;
}

export const Contracts: React.FC<Props> = ({ info }) => {
    if (!info) {
        return <h4>Não encontramos nenhuma informação para este banco</h4>;
    }

    return (
        <Form.Group>
            <Row>
                <Col>
                    <Form.Label style={{ fontWeight: "bold" }}>
                        Nº CONTRATO
                    </Form.Label>
                    <Form.Control value={info?.numero_contrato} disabled />
                </Col>
                <Col>
                    <Form.Label style={{ fontWeight: "bold" }}>
                        Nº LICITAÇÃO
                    </Form.Label>
                    <Form.Control value={info?.numero_licitacao} disabled />
                </Col>
                <Col>
                    <Form.Label style={{ fontWeight: "bold" }}>
                        ORDEM DE SERVIÇO
                    </Form.Label>
                    <Form.Control value={info?.ordem_servico} disabled />
                </Col>
            </Row>
            <Col>
                <Form.Label style={{ fontWeight: "bold" }}>
                    VALOR INICIAL DO CONTRATO
                </Form.Label>
                <Form.Control value={info?.valor_contrato} disabled />
            </Col>

            <Row>
                <Col>
                    <Form.Label style={{ fontWeight: "bold" }}>
                        INÍCO VIGÊNCIA
                    </Form.Label>
                    <Form.Control value={info?.inicio_vigencia} disabled />
                </Col>
                <Col>
                    <Form.Label style={{ fontWeight: "bold" }}>
                        TÉRMINO VIGÊNCIA
                    </Form.Label>
                    <Form.Control value={info?.termino_vigencia} disabled />
                </Col>
                <Col>
                    <Form.Label style={{ fontWeight: "bold" }}>
                        VIGÊNCIA ATUALIZADA
                    </Form.Label>
                    <Form.Control value={info?.vigencia_atualizada} disabled />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label style={{ fontWeight: "bold" }}>
                        CONTRATADO
                    </Form.Label>
                    <Form.Control value={info?.valor_contrato} disabled />
                </Col>
                <Col>
                    <Form.Label style={{ fontWeight: "bold" }}>
                        EXECUTADO
                    </Form.Label>
                    <Form.Control
                        value={info?.valor_utilizado_executado}
                        disabled
                    />
                </Col>
            </Row>
            <Col>
                <Form.Label style={{ fontWeight: "bold" }}>EMPRESA</Form.Label>
                <Form.Control value={info?.empresa} disabled />
            </Col>
        </Form.Group>
    );
};
