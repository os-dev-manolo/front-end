import React from "react";
import { Col, Form, Row } from "react-bootstrap";

interface LayersInfoProps {
    info: Record<string, string>;
}

export const LayersInfo: React.FC<LayersInfoProps> = ({ info }) => {
    return (
        <Form.Group>
            <Row md={3}>
                {Object.entries(info).map(([key, value]) => {
                    if (!value) {
                        return null;
                    }

                    return (
                        <Col>
                            <Form.Label>{key}</Form.Label>
                            <Form.Control value={value} disabled />
                        </Col>
                    );
                })}
            </Row>
        </Form.Group>
    );
};
