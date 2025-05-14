import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import environments from "../../../../../../environments";
import { IProperty } from "../../../../../../shared/interfaces/IProperties";
import { measureMask } from "../../../../../../shared/utils/mask.utils";

interface Siderops {
    propertyInfo: IProperty | undefined;
    measure?: string;
    subscription?: string | undefined;
}

export const GenericSideConfrontantes: React.FC<Siderops> = ({
    propertyInfo,
    measure,
    subscription,
}) => {
    const endereco = `${propertyInfo?.logradouronome}, ${propertyInfo?.logradouronumero} - ${propertyInfo?.bairronome}`;
    const clientName = environments.client.name;

    if (propertyInfo === undefined) {
        return (
            <h4>
                Não encontramos nenhuma informação para esta confrontação:{" "}
                {subscription}
            </h4>
        );
    }

    return (
        <Form.Group>
            <Row>
                {propertyInfo?.cadastro && (
                    <Col>
                        <Form.Label>Cadastro</Form.Label>
                        <Form.Control value={propertyInfo.cadastro} disabled />
                    </Col>
                )}

                {propertyInfo?.inscricaoimobiliaria && (
                    <Col>
                        <Form.Label>Inscrição</Form.Label>
                        <Form.Control
                            value={propertyInfo?.inscricaoimobiliaria}
                            disabled
                        />
                    </Col>
                )}
            </Row>
            <Row>
                {propertyInfo?.logradouronome && (
                    <Col>
                        <Form.Label>Endereço</Form.Label>
                        <Form.Control value={endereco} disabled />
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
            </Row>

            <Row>
                {propertyInfo?.quadra && (
                    <Col>
                        <Form.Label>Quadra</Form.Label>
                        <Form.Control value={propertyInfo?.quadra} disabled />
                    </Col>
                )}
                {propertyInfo?.lote && (
                    <Col>
                        <Form.Label>Lote</Form.Label>
                        <Form.Control value={propertyInfo?.lote} disabled />
                    </Col>
                )}
                {propertyInfo?.areaterreno && (
                    <Col>
                        <Form.Label>Área do terreno</Form.Label>
                        <Form.Control
                            value={measureMask(propertyInfo?.areaterreno)}
                            disabled
                        />
                    </Col>
                )}
                {propertyInfo?.areaconstruida && (
                    <Col>
                        <Form.Label>Área construída</Form.Label>
                        <Form.Control
                            value={measureMask(propertyInfo?.areaconstruida)}
                            disabled
                        />
                    </Col>
                )}
            </Row>
            <Row>
                {measure && (
                    <Col>
                        <Form.Label>
                            <strong>Medida da Confrontação</strong>
                        </Form.Label>
                        <Form.Control value={`${measure}`} disabled />
                    </Col>
                )}

                {subscription && clientName.match("jgv") ? (
                    <Col>
                        <Form.Label>
                            <strong>Cadastro informado</strong>
                        </Form.Label>
                        <Form.Control value={subscription} disabled />
                    </Col>
                ) : (
                    <Col>
                        <Form.Label>
                            <strong>Inscrição informada</strong>
                        </Form.Label>
                        <Form.Control value={subscription} disabled />
                    </Col>
                )}
            </Row>
        </Form.Group>
    );
};
