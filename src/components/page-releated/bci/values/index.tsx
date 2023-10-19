import React from "react";

import { Row, Col } from "react-bootstrap";

import { IPropertyValues } from "../../../../shared/interfaces/IProperties";

import { DotLine, Topic } from "../styles";

interface ValuesProps {
    values: IPropertyValues[];
}

export const Values: React.FC<ValuesProps> = ({ values }) => {
    return (
        <div>
            <Topic>
                <h5>Valores venais</h5>
            </Topic>

            {values.map((value, index) => (
                <div key={`${value.id}`}>
                    {index > 0 && <DotLine />}
                    <p>Ano: {value.ano}</p>
                    <Row>
                        <Col>
                            <p>Item</p>
                        </Col>
                        <Col>
                            <p>Conteúdo</p>
                        </Col>
                        <Col>
                            <p>Item</p>
                        </Col>
                        <Col>
                            <p>Conteúdo</p>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <p>Valor Venal Territorial</p>
                        </Col>
                        <Col>
                            {parseFloat(
                                value.valorvenalterritorial || "0"
                            ).toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                                style: "currency",
                                currency: "BRL",
                            })}
                        </Col>
                        <Col>Valor m2 Territorial</Col>
                        <Col>
                            {parseFloat(
                                value.valorm2territorial || "0"
                            ).toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                                style: "currency",
                                currency: "BRL",
                            })}
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <p>Valor Venal Predial</p>
                        </Col>
                        <Col>
                            {parseFloat(
                                value.valorvenalpredial || "0"
                            ).toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                                style: "currency",
                                currency: "BRL",
                            })}
                        </Col>
                        <Col>Valor m2 Predial</Col>
                        <Col>
                            {parseFloat(
                                value.valorm2predial || "0"
                            ).toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                                style: "currency",
                                currency: "BRL",
                            })}
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <p>Valor Venal Total</p>
                        </Col>
                        <Col>
                            {(
                                parseFloat(value.valorvenalpredial || "0") +
                                parseFloat(value.valorvenalterritorial || "0")
                            ).toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                                style: "currency",
                                currency: "BRL",
                            })}
                        </Col>
                        <Col />
                        <Col />
                    </Row>

                    <Row>
                        <Col>
                            <p>Alíquota</p>
                        </Col>
                        <Col>
                            {value.aliquotapredial
                                ? value.aliquotapredial
                                : value.aliquotaterritorial}{" "}
                            %
                        </Col>
                        <Col />
                        <Col />
                    </Row>

                    <Row>
                        <Col>Total Imposto</Col>
                        <Col>
                            {parseFloat(
                                value.totalimposto || "0"
                            ).toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                                style: "currency",
                                currency: "BRL",
                            })}
                        </Col>
                        <Col />
                        <Col />
                    </Row>
                </div>
            ))}
        </div>
    );
};
