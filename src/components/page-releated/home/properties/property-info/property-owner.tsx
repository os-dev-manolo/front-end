import React from "react";

import { Col, Row, Form } from "react-bootstrap";
import { IProperty } from "../../../../../shared/interfaces/IProperties";

interface PropertyAndOwnerProps {
    propertyInfo?: IProperty;
}

export const PropertyAndOwner: React.FC<PropertyAndOwnerProps> = ({
    propertyInfo,
}) => {
    if (!propertyInfo) {
        <h4>Não encontramos nenhuma informação para esta propriedade</h4>;
    }

    return (
        <Form.Group>
            <Row>
                <h4>Informações propriedade e proprietário</h4>
            </Row>
            <Row>
                {propertyInfo?.cadastro && (
                    <Col>
                        <Form.Label>Cadastro</Form.Label>
                        <Form.Control value={propertyInfo.cadastro} disabled />
                    </Col>
                )}

                {propertyInfo?.inscricaoimobiliaria && (
                    <Col sm={6}>
                        <Form.Label>Inscrição</Form.Label>
                        <Form.Control
                            value={propertyInfo?.inscricaoimobiliaria}
                            disabled
                        />
                    </Col>
                )}

                {propertyInfo?.matricula && (
                    <Col>
                        <Form.Label>Matrícula</Form.Label>
                        <Form.Control
                            value={propertyInfo?.matricula}
                            disabled
                        />
                    </Col>
                )}
            </Row>

            <Row>
                {propertyInfo?.logradouronome && (
                    <Col>
                        <Form.Label>Logradouro</Form.Label>
                        <Form.Control
                            value={propertyInfo?.logradouronome}
                            disabled
                        />
                    </Col>
                )}

                {propertyInfo?.logradouronumero && (
                    <Col sm={2}>
                        <Form.Label>Número</Form.Label>
                        <Form.Control
                            value={propertyInfo?.logradouronumero}
                            disabled
                        />
                    </Col>
                )}

                {propertyInfo?.bairronome && (
                    <Col>
                        <Form.Label>Bairro</Form.Label>

                        <Form.Control
                            value={propertyInfo?.bairronome}
                            disabled
                        />
                    </Col>
                )}
            </Row>

            <Row>
                {propertyInfo?.propnome && (
                    <Col>
                        <Form.Label>Proprietário</Form.Label>
                        <Form.Control value={propertyInfo?.propnome} disabled />
                    </Col>
                )}

                {propertyInfo?.propdocumento && (
                    <Col sm={4}>
                        <Form.Label>Documento proprietário</Form.Label>
                        <Form.Control
                            value={propertyInfo?.propdocumento}
                            disabled
                        />
                    </Col>
                )}
            </Row>

            <Row>
                {propertyInfo?.respnome && (
                    <Col>
                        <Form.Label>Responsável</Form.Label>
                        <Form.Control value={propertyInfo?.respnome} disabled />
                    </Col>
                )}

                {propertyInfo?.respdocumento && (
                    <Col sm={4}>
                        <Form.Label>Documento responsável</Form.Label>
                        <Form.Control
                            value={propertyInfo?.respdocumento}
                            disabled
                        />
                    </Col>
                )}
            </Row>
        </Form.Group>
    );
};
