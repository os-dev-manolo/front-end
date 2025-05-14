import React from "react";

import { Row, Col } from "react-bootstrap";

import { IPropertyCharact } from "../../../../shared/interfaces/IProperties";

import { Divisor, Topic } from "../styles";

import { parser } from "./helpers";

interface PropertyCharactProps {
    charact: IPropertyCharact;
}

export const PropertyCharact: React.FC<PropertyCharactProps> = ({
    charact,
}) => {
    return (
        <>
            {Object.keys(charact).map((group) => (
                <div key={group}>
                    <Topic>
                        <h5>{group}</h5>
                    </Topic>
                    <Row>
                        <Col>
                            <p>Item</p>
                        </Col>
                        <Col>
                            <p>Conteúdo</p>
                        </Col>
                    </Row>

                    {charact[group].map(({ pergunta, resposta }) => {
                        if (pergunta === "INCENDIO") return null;

                        return (
                            <Row key={`${pergunta}-${resposta}`}>
                                <Col>
                                    <p>{pergunta}</p>
                                </Col>
                                <Col>
                                    <p>{parser(pergunta, resposta)}</p>
                                </Col>
                            </Row>
                        );
                    })}
                    <Divisor />
                </div>
            ))}
        </>
    );
};
