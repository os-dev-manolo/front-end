import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { IProperty } from "../../../../../shared/interfaces/IProperties";
import { measureMask } from "../../../../../shared/utils/mask.utils";

interface LandProps {
    propertyInfo?: IProperty;
}

export const Land: React.FC<LandProps> = ({ propertyInfo }) => {
    if (!propertyInfo) {
        return <h4>Não encontramos nenhuma informação para este terreno</h4>;
    }
    return (
        <>
            <Row>
                <h4>Informações do terreno</h4>
            </Row>
            <Row>
                {propertyInfo?.areaterreno && (
                    <Col>
                        <Form.Label>Área total do terreno</Form.Label>
                        <Form.Control
                            disabled
                            value={measureMask(propertyInfo.areaterreno)}
                        />
                    </Col>
                )}

                {propertyInfo?.profundidade && (
                    <Col>
                        <Form.Label>Profundidade</Form.Label>
                        <Form.Control
                            disabled
                            value={`${propertyInfo.profundidade} m`}
                        />
                    </Col>
                )}
            </Row>
            <Row>
                {/* <Col>
                    <Form.Label>Total Unidades</Form.Label>
                    <Form.Control disabled />
                </Col> */}

                {/* {propertyInfo.testadas?.metragem && (
                    <Col>
                        <Form.Label>Testada</Form.Label>
                        <Form.Control disabled />
                    </Col>
                )} */}
            </Row>
            <Row>
                {propertyInfo?.quadra && (
                    <Col>
                        <Form.Label>Quadra</Form.Label>
                        <Form.Control disabled value={propertyInfo.quadra} />
                    </Col>
                )}

                {propertyInfo?.lote && (
                    <Col>
                        <Form.Label>Lote</Form.Label>
                        <Form.Control disabled value={propertyInfo.lote} />
                    </Col>
                )}
            </Row>
            {/* <Row>
                <Col>
                    <Form.Label>Englobado</Form.Label>
                    <Form.Control disabled />
                </Col>
            </Row> */}
        </>
    );
};
