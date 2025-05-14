import React from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import { Education } from "./tabs/education";
import { Healthcare } from "./tabs/healthcare";
import { Social } from "./tabs/social";
import { Taxes } from "./tabs/taxes";

interface IBGEInfoProps {
    info: Record<string, string>;
}

export const IBGEInfo: React.FC<IBGEInfoProps> = ({ info }) => {
    let count = 0;
    Object.entries(info).forEach(([key, value]) => {
        if (!value) {
            return null;
        }
        count += 1;
        return key;
    });
    count -= 1;
    const habitants = count / 4;
    return (
        <Tab.Container defaultActiveKey="taxes">
            <Row>
                <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item as="button">
                            <Nav.Link eventKey="taxes">PROPRIETÁRIO</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="button">
                            <Nav.Link eventKey="healthcare">
                                BANCO SAÚDE
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="button">
                            <Nav.Link eventKey="social">BANCO SOCIAL</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="button">
                            <Nav.Link eventKey="education">
                                BANCO EDUCAÇÃO
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col>
                    <Tab.Content
                        style={{
                            height: "350px",
                            margin: 0,
                            overflowX: "hidden",
                            overflowY: "auto",
                        }}
                    >
                        <Tab.Pane eventKey="healthcare">
                            <Healthcare info={info} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="taxes">
                            <Taxes info={info} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="education">
                            <Education info={info} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="social">
                            <Social info={info} />
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
            <Row style={{ marginLeft: "3%" }}>
                Total de moradores: {habitants}
            </Row>
        </Tab.Container>
    );
};
