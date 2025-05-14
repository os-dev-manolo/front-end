import React from "react";

import { Row, Col } from "react-bootstrap";

import { IPropertyTestada } from "../../../../shared/interfaces/IProperties";
import { DotLine, Topic } from "../styles";

interface TestadaProps {
    testadas: IPropertyTestada[];
}

export const Testada: React.FC<TestadaProps> = ({ testadas }) => {
    return (
        <>
            <Topic>
                <h5>Metragens</h5>
            </Topic>
            {testadas.map((testada, index) => (
                <div key={testada.id}>
                    {index > 0 && <DotLine />}
                    <Row>
                        <Col>
                            <p>Testada</p>
                        </Col>
                        <Col>
                            <p>Metragem</p>
                        </Col>
                        <Col>
                            <p>Seção</p>
                        </Col>
                        <Col>
                            <p>Logradouro</p>
                        </Col>
                        <Col>
                            <p>Bairro</p>
                        </Col>
                        <Col>
                            <p>Valor seção</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>Principal</p>
                        </Col>
                        <Col>
                            <p>{testada.metragem}</p>
                        </Col>
                        <Col>
                            <p>{testada.codigosecao}</p>
                        </Col>
                        <Col>
                            <p>{testada.logradouro}</p>
                        </Col>
                        <Col>
                            <p>{testada.bairro}</p>
                        </Col>
                        <Col>
                            <p>
                                {parseFloat(
                                    testada.valorsecao || "0"
                                ).toLocaleString("pt-BR", {
                                    minimumFractionDigits: 2,
                                })}
                            </p>
                        </Col>
                    </Row>
                </div>
            ))}
        </>
    );
};
