import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { IProperty } from "../../../../../shared/interfaces/IProperties";
import { measureMask } from "../../../../../shared/utils/mask.utils";

interface UnitsProps {
    propertyInfo?: IProperty;
}

export const Units: React.FC<UnitsProps> = ({ propertyInfo }) => {
    if (!propertyInfo) {
        return <h4>Nenhuma informação sobre as unidades encontrada.</h4>;
    }

    const testada = propertyInfo.testadas
        ? propertyInfo.testadas[0]
        : undefined;

    return (
        <>
            <Row>
                <h4>Informações das unidades</h4>
            </Row>
            <Col>
                <Row>
                    <h5>Imóvel {propertyInfo.cadastro}</h5>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>N Unidade</Form.Label>
                        <Form.Control
                            value={
                                propertyInfo.inscricaoimobiliaria?.slice(-3) ||
                                ""
                            }
                            disabled
                        />
                    </Col>

                    {propertyInfo?.areaconstruida && (
                        <Col>
                            <Form.Label>Área construída</Form.Label>
                            <Form.Control
                                value={measureMask(propertyInfo.areaconstruida)}
                                disabled
                            />
                        </Col>
                    )}

                    {propertyInfo?.areatotalconstruida && (
                        <Col sm={6}>
                            <Form.Label>Área total construída</Form.Label>
                            <Form.Control
                                value={measureMask(
                                    propertyInfo?.areatotalconstruida
                                )}
                                disabled
                            />
                        </Col>
                    )}
                </Row>
                <Row>
                    {testada?.numerotestada && (
                        <Col sm={6}>
                            <Form.Label>N Pavimentos</Form.Label>
                            <Form.Control
                                value={testada?.numerotestada}
                                disabled
                            />
                        </Col>
                    )}
                </Row>
            </Col>
        </>
    );
};
