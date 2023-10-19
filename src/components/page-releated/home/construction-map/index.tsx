import React from "react";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import { Contracts } from "./tabs/contracts";
import { Fiscalization } from "./tabs/fiscalization";
import { General } from "./tabs/general";
import { Pictures } from "./tabs/pictures";

interface ConstructionsMapProps {
    info: Record<string, string>;
}

export const ConstructionMap: React.FC<ConstructionsMapProps> = ({ info }) => {
    return (
        <Tab.Container defaultActiveKey="general">
            <Row>
                <Col sm={2}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item as="button">
                            <Nav.Link eventKey="general">GERAIS</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="button">
                            <Nav.Link eventKey="contracts">
                                CONTRATUAIS
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="button">
                            <Nav.Link eventKey="fiscalization">
                                FISCALIZAÇÃO
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="button">
                            <Nav.Link eventKey="pictures">
                                FOTOS DA OBRA
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col>
                    <Tab.Content
                        style={{
                            height: "470px",
                            margin: 0,
                            overflowX: "hidden",
                            overflowY: "auto",
                        }}
                    >
                        <Tab.Pane eventKey="general">
                            <General info={info} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="contracts">
                            <Contracts info={info} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="fiscalization">
                            <Fiscalization info={info} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="pictures">
                            <Pictures info={info} />
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
};
