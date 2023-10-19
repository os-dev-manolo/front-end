import React from "react";
import { Col, Form, Row } from "react-bootstrap";

interface Props {
    info?: Record<string, string>;
}

export const Owner: React.FC<Props> = ({ info }) => {
    if (!info) {
        return <h4>Não encontramos nenhuma informação para este banco</h4>;
    }

    return (
        <Form.Group>
            <Row>
                <h4>Informações da propriedade</h4>
            </Row>
            <Row>
                {info?.cadastro && (
                    <Col sm={2}>
                        <Form.Label>Cadastro</Form.Label>
                        <Form.Control value={info.cadastro} disabled />
                    </Col>
                )}

                {info?.inscricao && (
                    <Col>
                        <Form.Label>Inscrição</Form.Label>
                        <Form.Control value={info?.inscricao} disabled />
                    </Col>
                )}
                {info?.utilizacao && (
                    <Col>
                        <Form.Label>Utilização</Form.Label>
                        <Form.Control value={info?.utilizacao} disabled />
                    </Col>
                )}
                {info?.situacaocadastral && (
                    <Col>
                        <Form.Label>Situação Cadastral</Form.Label>
                        <Form.Control
                            value={info?.situacaocadastral}
                            disabled
                        />
                    </Col>
                )}
            </Row>
            <Row>
                {info?.logradouronome && (
                    <Col>
                        <Form.Label>Logradouro</Form.Label>
                        <Form.Control value={info?.logradouronome} disabled />
                    </Col>
                )}

                {info?.imovelnumero && (
                    <Col sm={2}>
                        <Form.Label>Número</Form.Label>
                        <Form.Control value={info?.imovelnumero} disabled />
                    </Col>
                )}

                {info?.bairro && (
                    <Col>
                        <Form.Label>Bairro</Form.Label>
                        <Form.Control value={info?.bairro} disabled />
                    </Col>
                )}
            </Row>

            <Row>
                {info?.propnome && (
                    <Col>
                        <Form.Label>Proprietário</Form.Label>
                        <Form.Control value={info?.propnome} disabled />
                    </Col>
                )}
            </Row>
            <Row />
            <Row>
                {info?.imunidade_iptu && (
                    <Col>
                        <Form.Label>Imunidade/IPTU</Form.Label>
                        <Form.Control value={info?.imunidade_iptu} disabled />
                    </Col>
                )}
            </Row>
            <Row />
        </Form.Group>
    );
};
