import React from "react";
import { Col, Form, Row } from "react-bootstrap";

interface PgvInfoProps {
    info: Record<string, string>;
}

export const ZoneamentoPgv: React.FC<PgvInfoProps> = ({ info }) => {
    return (
        <Form.Group style={{ padding: "2px" }}>
            <Row>
                <Col>
                    <Form.Label style={{ fontWeight: "bold" }}>
                        Nome do Zoneamento
                    </Form.Label>
                    <Form.Control
                        disabled
                        value={info?.nome.toLocaleUpperCase()}
                    />
                </Col>
                <Col>
                    <Form.Label style={{ fontWeight: "bold" }}>
                        Sigla
                    </Form.Label>
                    <Form.Control
                        disabled
                        value={info?.sigla.toLocaleUpperCase()}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label style={{ fontWeight: "bold" }}>
                        Valor IPTU 2023
                    </Form.Label>
                    <Form.Control disabled value={info?.valor_iptu_2023} />
                </Col>
                <Col>
                    <Form.Label style={{ color: "teal", fontWeight: "bold" }}>
                        Valor IPTU 2024
                    </Form.Label>
                    <Form.Control disabled value={info?.iptu_2024} />
                </Col>
                <Col>
                    <Form.Label style={{ fontWeight: "bold" }}>
                        % de Aumento
                    </Form.Label>
                    <Form.Control
                        disabled
                        value={info?.porcentagem_de_aumento}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label style={{ color: "teal", fontWeight: "bold" }}>
                        Redutor 90%
                    </Form.Label>
                    <Form.Control disabled value={info?.red_90} />
                </Col>
                <Col>
                    <Form.Label style={{ fontWeight: "bold" }}>
                        % de aumento com redutor 90%
                    </Form.Label>
                    <Form.Control disabled value={info?.porcentagem_90} />
                </Col>

                <Col>
                    <Form.Label style={{ color: "teal", fontWeight: "bold" }}>
                        Redutor 80%
                    </Form.Label>
                    <Form.Control disabled value={info?.red_80} />
                </Col>
                <Col>
                    <Form.Label style={{ fontWeight: "bold" }}>
                        % de aumento com redutor 80%
                    </Form.Label>
                    <Form.Control disabled value={info?.porcentagem_80} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label style={{ color: "teal", fontWeight: "bold" }}>
                        Redutor 70%
                    </Form.Label>
                    <Form.Control disabled value={info?.red_70} />
                </Col>
                <Col>
                    <Form.Label style={{ fontWeight: "bold" }}>
                        % de aumento com redutor 70%
                    </Form.Label>
                    <Form.Control disabled value={info?.porcentagem_70} />
                </Col>

                <Col>
                    <Form.Label style={{ color: "teal", fontWeight: "bold" }}>
                        Redutor 60%
                    </Form.Label>
                    <Form.Control disabled value={info?.red_60} />
                </Col>
                <Col>
                    <Form.Label style={{ fontWeight: "bold" }}>
                        % de aumento com redutor 60%
                    </Form.Label>
                    <Form.Control disabled value={info?.porcentagem_60} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label style={{ color: "teal", fontWeight: "bold" }}>
                        Redutor 50%
                    </Form.Label>
                    <Form.Control disabled value={info?.red_50} />
                </Col>
                <Col>
                    <Form.Label style={{ fontWeight: "bold" }}>
                        % de aumento com redutor 50%
                    </Form.Label>
                    <Form.Control disabled value={info?.porcentagem_50} />
                </Col>

                <Col>
                    <Form.Label style={{ color: "teal", fontWeight: "bold" }}>
                        Redutor 40%
                    </Form.Label>
                    <Form.Control disabled value={info?.red_40} />
                </Col>
                <Col>
                    <Form.Label style={{ fontWeight: "bold" }}>
                        % de aumento com redutor 40%
                    </Form.Label>
                    <Form.Control disabled value={info?.porcentagem_40} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label style={{ color: "teal", fontWeight: "bold" }}>
                        Redutor 30%
                    </Form.Label>
                    <Form.Control disabled value={info?.red_30} />
                </Col>
                <Col>
                    <Form.Label style={{ fontWeight: "bold" }}>
                        % de aumento com redutor 30%
                    </Form.Label>
                    <Form.Control disabled value={info?.porcentagem_30} />
                </Col>

                <Col>
                    <Form.Label style={{ color: "teal", fontWeight: "bold" }}>
                        Redutor 20%
                    </Form.Label>
                    <Form.Control disabled value={info?.red_20} />
                </Col>
                <Col>
                    <Form.Label style={{ fontWeight: "bold" }}>
                        % de aumento com redutor 20%
                    </Form.Label>
                    <Form.Control disabled value={info?.porcentagem_20} />
                </Col>
            </Row>
            <Row>
                <Col sm={3}>
                    <Form.Label style={{ color: "teal", fontWeight: "bold" }}>
                        Redutor 10%
                    </Form.Label>
                    <Form.Control disabled value={info?.red_10} />
                </Col>
                <Col sm={3}>
                    <Form.Label style={{ fontWeight: "bold" }}>
                        % de aumento com redutor 10%
                    </Form.Label>
                    <Form.Control disabled value={info?.porcentagem_10} />
                </Col>
            </Row>
        </Form.Group>
    );
};
