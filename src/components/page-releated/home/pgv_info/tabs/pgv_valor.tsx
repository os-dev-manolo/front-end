import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { measureMask, moneyMask } from "../../../../../shared/utils/mask.utils";

interface Props {
    info?: Record<string, string>;
}

export const PgvValor2023: React.FC<Props> = ({ info }) => {
    if (!info) {
        return <h4>Não encontramos nenhuma informação</h4>;
    }

    return (
        <Form.Group style={{ padding: "2px" }}>
            <Row>
                <Col>
                    <Form.Label style={{ fontWeight: "bold" }}>
                        Área do lote
                    </Form.Label>
                    <Form.Control
                        disabled
                        value={measureMask(info?.arealote)}
                    />
                </Col>
                <Col>
                    <Form.Label style={{ fontWeight: "bold" }}>
                        Área construída
                    </Form.Label>
                    <Form.Control
                        disabled
                        value={measureMask(info?.areaconstruida)}
                    />
                </Col>
                <Col>
                    <Form.Label style={{ fontWeight: "bold" }}>
                        Área total construída
                    </Form.Label>
                    <Form.Control
                        disabled
                        value={measureMask(info?.areatotalconstruida)}
                    />
                </Col>
                <Col>
                    <Form.Label style={{ fontWeight: "bold" }}>
                        Fração Ideal do Terreno
                    </Form.Label>
                    <Form.Control disabled value={info?.fracaoidealterreno} />
                </Col>
            </Row>
            <Row>
                <Col sm={2}>
                    <Form.Label>Valor m² terreno</Form.Label>
                    <Form.Control disabled value={info?.valorm2terreno} />
                </Col>
                <Col sm={3}>
                    <Form.Label>Valor m² edificação</Form.Label>
                    <Form.Control disabled value={info?.valorm2edific2023} />
                </Col>
                <Col sm={3}>
                    <Form.Label style={{ color: "teal", fontWeight: "bold" }}>
                        Valor m² terreno Proposta
                    </Form.Label>
                    <Form.Control
                        disabled
                        value={moneyMask(info?.vlr_m2_territorial_proposta)}
                    />
                </Col>
                <Col>
                    <Form.Label style={{ color: "teal", fontWeight: "bold" }}>
                        Valor m² edificação Proposta
                    </Form.Label>
                    <Form.Control
                        disabled
                        value={info?.vlr_m2_predial_proposta}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label>V.V Territorial</Form.Label>
                    <Form.Control disabled value={info?.v_v_terreno} />
                </Col>
                <Col>
                    <Form.Label>V.V Edificação</Form.Label>
                    <Form.Control disabled value={info?.v_v_edificacao} />
                </Col>
                <Col>
                    <Form.Label>V.V Total</Form.Label>
                    <Form.Control disabled value={info?.v_v_imovel} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label style={{ color: "teal", fontWeight: "bold" }}>
                        V.V Territorial Proposta
                    </Form.Label>
                    <Form.Control
                        disabled
                        value={info?.vvterritorial_proposta}
                    />
                </Col>
                <Col>
                    <Form.Label style={{ color: "teal", fontWeight: "bold" }}>
                        V.V Edificação Proposta
                    </Form.Label>
                    <Form.Control disabled value={info?.vvpredial_proposta} />
                </Col>
                <Col>
                    <Form.Label style={{ color: "teal", fontWeight: "bold" }}>
                        V.V Total Proposta
                    </Form.Label>
                    <Form.Control disabled value={info?.vvtotal_proposta} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label>IPTU</Form.Label>
                    <Form.Control disabled value={info?.valor_imposto} />
                </Col>
                <Col>
                    <Form.Label>Alíquota 2023</Form.Label>
                    <Form.Control disabled value={`${info?.aliquota2023}%`} />
                </Col>
                <Col>
                    <Form.Label style={{ color: "teal", fontWeight: "bold" }}>
                        IPTU Proposta
                    </Form.Label>
                    <Form.Control disabled value={info?.iptu_proposta} />
                </Col>
                <Col>
                    <Form.Label style={{ color: "teal", fontWeight: "bold" }}>
                        Alíquota Proposta
                    </Form.Label>
                    <Form.Control
                        disabled
                        value={`${info?.aliquota_proposta}`}
                    />
                </Col>
            </Row>
        </Form.Group>
    );
};
