import { orderBy } from "lodash";
import React from "react";
import { Row, Form, Col } from "react-bootstrap";
import environments from "../../../../../environments";
import { IProperty } from "../../../../../shared/interfaces/IProperties";
import { moneyMask, percentMask } from "../../../../../shared/utils/mask.utils";

interface ValuesProps {
    propertyInfo?: IProperty;
}

export const Values: React.FC<ValuesProps> = ({ propertyInfo }) => {
    if (!propertyInfo) {
        return <h4>Não encontramos valores para esta propriedade</h4>;
    }

    const lastValues = orderBy(propertyInfo?.lastvalues, "ano", "desc") || [];
    const values = orderBy(propertyInfo?.values, "ano", "desc") || [];
    const clientName = environments.client.name;

    const transformValue = (value: string) =>
        Number(
            value.includes(",")
                ? value.replaceAll(".", "").replace(",", ".")
                : value
        );

    return (
        <Form.Group>
            <Row>
                <h4>Informações dos valores</h4>
            </Row>
            {lastValues.map((value) => (
                <div key={value.cadastro}>
                    <Row>
                        <h5>
                            <strong>
                                Imóvel {value.cadastro} Ano {value.ano}
                            </strong>
                        </h5>
                    </Row>
                    <Row>
                        {propertyInfo?.tipo && (
                            <Col>
                                <Form.Label>Tipo</Form.Label>
                                <Form.Control
                                    value={propertyInfo?.tipo}
                                    disabled
                                />
                            </Col>
                        )}

                        {value.valorvenalterritorial && (
                            <Col>
                                <Form.Label>Valor Venal do Terreno</Form.Label>
                                <Form.Control
                                    value={moneyMask(
                                        value.valorvenalterritorial
                                    )}
                                    disabled
                                />
                            </Col>
                        )}

                        {value.valorvenalpredial && (
                            <Col>
                                <Form.Label>
                                    Valor Venal da Edificação
                                </Form.Label>
                                <Form.Control
                                    value={moneyMask(value.valorvenalpredial)}
                                    disabled
                                />
                            </Col>
                        )}
                    </Row>
                    {value.valorvenalpredial && value.valorvenalterritorial && (
                        <Col>
                            <Form.Label>Valor Venal Total</Form.Label>
                            <Form.Control
                                value={moneyMask(
                                    transformValue(value.valorvenalpredial) +
                                        transformValue(
                                            value.valorvenalterritorial
                                        )
                                )}
                                disabled
                            />
                        </Col>
                    )}
                    <Row>
                        {value.aliquotaterritorial && (
                            <Col>
                                <Form.Label>Alíquota territorial</Form.Label>
                                {clientName.match("tibagi") ? (
                                    <Form.Control
                                        value={moneyMask(
                                            value.aliquotaterritorial
                                        )}
                                        disabled
                                    />
                                ) : (
                                    <Form.Control
                                        value={percentMask(
                                            value.aliquotaterritorial
                                        )}
                                        disabled
                                    />
                                )}
                            </Col>
                        )}
                        {value.aliquotapredial && (
                            <Col>
                                <Form.Label>Alíquota predial</Form.Label>
                                {clientName.match("tibagi") ? (
                                    <Form.Control
                                        value={moneyMask(value.aliquotapredial)}
                                        disabled
                                    />
                                ) : (
                                    <Form.Control
                                        value={percentMask(
                                            value.aliquotapredial
                                        )}
                                        disabled
                                    />
                                )}
                            </Col>
                        )}
                    </Row>
                    <Row>
                        {value.valorm2terreno && (
                            <Col>
                                <Form.Label>Valor do m2 do terreno</Form.Label>
                                <Form.Control
                                    value={moneyMask(value.valorm2terreno)}
                                    disabled
                                />
                            </Col>
                        )}
                        {value.valorm2unidade && (
                            <Col>
                                <Form.Label>Valor do m2 unidade</Form.Label>
                                <Form.Control
                                    value={moneyMask(value.valorm2unidade)}
                                    disabled
                                />
                            </Col>
                        )}
                    </Row>
                </div>
            ))}
            {values.map((value) => (
                <div key={value.cadastro}>
                    <Row>
                        <h5>
                            Imóvel {value.cadastro} Ano {value.ano}
                        </h5>
                    </Row>
                    <Row>
                        {propertyInfo?.tipo && (
                            <Col>
                                <Form.Label>Tipo</Form.Label>
                                <Form.Control
                                    value={propertyInfo?.tipo}
                                    disabled
                                />
                            </Col>
                        )}

                        {value.valorvenalterritorial && (
                            <Col>
                                <Form.Label>Valor Venal do Terreno</Form.Label>
                                <Form.Control
                                    value={moneyMask(
                                        value.valorvenalterritorial
                                    )}
                                    disabled
                                />
                            </Col>
                        )}

                        {value.valorvenalpredial && (
                            <Col>
                                <Form.Label>
                                    Valor Venal da Edificação
                                </Form.Label>
                                <Form.Control
                                    value={moneyMask(value.valorvenalpredial)}
                                    disabled
                                />
                            </Col>
                        )}
                    </Row>
                    {value.valorvenalpredial && value.valorvenalterritorial && (
                        <Col>
                            <Form.Label>Valor Venal Total</Form.Label>
                            <Form.Control
                                value={moneyMask(
                                    transformValue(value.valorvenalpredial) +
                                        transformValue(
                                            value.valorvenalterritorial
                                        )
                                )}
                                disabled
                            />
                        </Col>
                    )}
                    <Row>
                        {value.aliquotaterritorial && (
                            <Col>
                                <Form.Label>Alíquota territorial</Form.Label>
                                <Form.Control
                                    value={percentMask(
                                        value.aliquotaterritorial
                                    )}
                                    disabled
                                />
                            </Col>
                        )}
                        {value.aliquotapredial && (
                            <Col>
                                <Form.Label>Alíquota predial</Form.Label>
                                <Form.Control
                                    value={percentMask(value.aliquotapredial)}
                                    disabled
                                />
                            </Col>
                        )}
                    </Row>
                    <Row>
                        {value.valorm2territorial && (
                            <Col>
                                <Form.Label>Valor do m2 do terreno</Form.Label>
                                <Form.Control
                                    value={moneyMask(value.valorm2territorial)}
                                    disabled
                                />
                            </Col>
                        )}
                        {value.valorm2predial && (
                            <Col>
                                <Form.Label>Valor do m2 predial</Form.Label>
                                <Form.Control
                                    value={moneyMask(value.valorm2predial)}
                                    disabled
                                />
                            </Col>
                        )}
                    </Row>
                </div>
            ))}
        </Form.Group>
    );
};
