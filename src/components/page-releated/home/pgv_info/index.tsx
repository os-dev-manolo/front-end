import React from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import { Owner } from "./tabs/owner";
import { PgvValor2023 } from "./tabs/pgv_valor";
import { Reductors } from "./tabs/reductors";

interface PgvInfoProps {
    info: Record<string, string>;
}

export const PgvInfo: React.FC<PgvInfoProps> = ({ info }) => {
    return (
        <Tab.Container defaultActiveKey="owner">
            <Row>
                <Col sm={2}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item as="button">
                            <Nav.Link eventKey="owner">
                                Local/Proprietário
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="button">
                            <Nav.Link eventKey="values">PGV Proposta</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="button">
                            <Nav.Link eventKey="reductors">Redutores</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col>
                    <Tab.Content
                        style={{
                            height: "425px",
                            margin: 0,
                            overflowX: "hidden",
                            overflowY: "auto",
                        }}
                    >
                        <Tab.Pane eventKey="owner">
                            <Owner info={info} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="values">
                            <PgvValor2023 info={info} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="reductors">
                            <Reductors info={info} />
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
};
