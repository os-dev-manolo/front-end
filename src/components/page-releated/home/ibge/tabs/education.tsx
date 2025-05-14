import React from "react";
import { Col, Form, Row } from "react-bootstrap";

interface Props {
    info?: Record<string, string>;
}

export const Education: React.FC<Props> = ({ info }) => {
    if (!info) {
        return <h4>Não encontramos nenhuma informação para este banco</h4>;
    }

    return (
        <>
            <Row>
                <h4>Informações do Banco EDUCAÇÃO</h4>
            </Row>
            <Row>
                {info?.banco === "EDUCACAO" && (
                    <>
                        <Col colspan={5}>
                            <Form.Label>Nome Pessoa</Form.Label>
                            <Form.Control disabled value={info?.nome_pesso} />
                        </Col>
                        <Col>
                            <Form.Label>Rua</Form.Label>
                            <Form.Control disabled value={info?.rua} />
                        </Col>
                        <Col sm={2}>
                            <Form.Label>Número</Form.Label>
                            <Form.Control disabled value={info?.numero} />
                        </Col>
                    </>
                )}
            </Row>
            <Row>
                {info?.banco1 === "EDUCACAO" && (
                    <>
                        <Col>
                            <Form.Label>Nome Pessoa</Form.Label>
                            <Form.Control disabled value={info?.nome_pes_1} />
                        </Col>
                        <Col>
                            <Form.Label>Rua</Form.Label>
                            <Form.Control disabled value={info?.rua1} />
                        </Col>
                        <Col sm={2}>
                            <Form.Label>Número</Form.Label>
                            <Form.Control disabled value={info?.numero1} />
                        </Col>
                    </>
                )}
            </Row>
            <Row>
                {info?.banco2 === "EDUCACAO" && (
                    <>
                        <Col>
                            <Form.Label>Nome Pessoa</Form.Label>
                            <Form.Control disabled value={info?.nome_pes_2} />
                        </Col>
                        <Col>
                            <Form.Label>Rua</Form.Label>
                            <Form.Control disabled value={info?.rua2} />
                        </Col>
                        <Col sm={2}>
                            <Form.Label>Número</Form.Label>
                            <Form.Control disabled value={info?.numero2} />
                        </Col>
                    </>
                )}
            </Row>
            <Row>
                {info?.banco3 === "EDUCACAO" && (
                    <>
                        <Col>
                            <Form.Label>Nome Pessoa</Form.Label>
                            <Form.Control disabled value={info?.nome_pes_3} />
                        </Col>
                        <Col>
                            <Form.Label>Rua</Form.Label>
                            <Form.Control disabled value={info?.rua3} />
                        </Col>
                        <Col sm={2}>
                            <Form.Label>Número</Form.Label>
                            <Form.Control disabled value={info?.numero3} />
                        </Col>
                    </>
                )}
            </Row>
            <Row>
                {info?.banco4 === "EDUCACAO" && (
                    <>
                        <Col>
                            <Form.Label>Nome Pessoa</Form.Label>
                            <Form.Control disabled value={info?.nome_pes_4} />
                        </Col>
                        <Col>
                            <Form.Label>Rua</Form.Label>
                            <Form.Control disabled value={info?.rua4} />
                        </Col>
                        <Col sm={2}>
                            <Form.Label>Número</Form.Label>
                            <Form.Control disabled value={info?.numero4} />
                        </Col>
                    </>
                )}
            </Row>
            <Row>
                {info?.banco5 === "EDUCACAO" && (
                    <>
                        <Col>
                            <Form.Label>Nome Pessoa</Form.Label>
                            <Form.Control disabled value={info?.nome_pes_5} />
                        </Col>
                        <Col>
                            <Form.Label>Rua</Form.Label>
                            <Form.Control disabled value={info?.rua5} />
                        </Col>
                        <Col sm={2}>
                            <Form.Label>Número</Form.Label>
                            <Form.Control disabled value={info?.numero5} />
                        </Col>
                    </>
                )}
            </Row>
            <Row>
                {info?.banco6 === "EDUCACAO" && (
                    <>
                        <Col>
                            <Form.Label>Nome Pessoa</Form.Label>
                            <Form.Control disabled value={info?.nome_pes_6} />
                        </Col>
                        <Col>
                            <Form.Label>Rua</Form.Label>
                            <Form.Control disabled value={info?.rua6} />
                        </Col>
                        <Col sm={2}>
                            <Form.Label>Número</Form.Label>
                            <Form.Control disabled value={info?.numero6} />
                        </Col>
                    </>
                )}
            </Row>
            <Row>
                {info?.banco7 === "EDUCACAO" && (
                    <>
                        <Col>
                            <Form.Label>Nome Pessoa</Form.Label>
                            <Form.Control disabled value={info?.nome_pes_7} />
                        </Col>
                        <Col>
                            <Form.Label>Rua</Form.Label>
                            <Form.Control disabled value={info?.rua7} />
                        </Col>
                        <Col sm={2}>
                            <Form.Label>Número</Form.Label>
                            <Form.Control disabled value={info?.numero7} />
                        </Col>
                    </>
                )}
            </Row>
            <Row>
                {info?.banco8 === "EDUCACAO" && (
                    <>
                        <Col>
                            <Form.Label>Nome Pessoa</Form.Label>
                            <Form.Control disabled value={info?.nome_pes_8} />
                        </Col>
                        <Col>
                            <Form.Label>Rua</Form.Label>
                            <Form.Control disabled value={info?.rua8} />
                        </Col>
                        <Col sm={2}>
                            <Form.Label>Número</Form.Label>
                            <Form.Control disabled value={info?.numero8} />
                        </Col>
                    </>
                )}
            </Row>
        </>
    );
};
