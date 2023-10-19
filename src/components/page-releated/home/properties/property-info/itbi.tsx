import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { useProperties } from "../../../../../shared/contexts/properties.context";
import { IPropertyITBIEntity } from "../../../../../shared/providers/property/entities/property-itbi.entity";
import { moneyMask } from "../../../../../shared/utils/mask.utils";

interface ItbiProps {
    registration?: string | number;
}

export const ITBI: React.FC<ItbiProps> = ({ registration }) => {
    const { getPropertyITBI } = useProperties();

    const [loading, setLoading] = useState(false);
    const [itbis, setItbis] = useState<IPropertyITBIEntity[]>([]);

    useEffect(() => {
        const fetchItbi = async () => {
            if (!registration) return;

            setLoading(true);
            try {
                const itbisList = await getPropertyITBI(registration);

                setItbis(itbisList);
            } finally {
                setLoading(false);
            }
        };

        if (!loading && !itbis.length) {
            fetchItbi();
        }
    }, []);

    if (!itbis.length && !loading)
        return <h4>Nenhuma informação encontrada</h4>;

    if (loading) return null;

    return (
        <Form.Group>
            <Row>
                <h5>Proprietário</h5>
                <Row>
                    <Col>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control value={itbis[0].owner.name} disabled />
                    </Col>
                    <Col>
                        <Form.Label>Nome Fantasia</Form.Label>
                        <Form.Control
                            value={itbis[0].owner.tradingName}
                            disabled
                        />
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col sm={4}>
                        <Form.Label>CPF/CNPJ</Form.Label>
                        <Form.Control
                            value={itbis[0].owner.document}
                            disabled
                        />
                    </Col>
                    <Col>
                        <Form.Label>Endereço</Form.Label>
                        <Form.Control
                            value={itbis[0].owner.address.inlineAddress}
                            disabled
                        />
                    </Col>
                </Row>
            </Row>

            <hr />

            <Row>
                <h5>Imóvel</h5>
                <Row>
                    <Col sm={4}>
                        <Form.Label>Tipo</Form.Label>
                        <Form.Control value={itbis[0].property.type} disabled />
                    </Col>
                    <Col sm={2}>
                        <Form.Label>Zoneamento</Form.Label>
                        <Form.Control
                            value={itbis[0].property.address.zone}
                            disabled
                        />
                    </Col>
                </Row>

                <Row className="mt-2">
                    <Col>
                        <Form.Label>Endereço</Form.Label>
                        <Form.Control
                            value={itbis[0].property.address.inlineAddress}
                            disabled
                        />
                    </Col>
                    <Col sm={2}>
                        <Form.Label>Quadra</Form.Label>
                        <Form.Control
                            value={itbis[0].property.address.quadra}
                            disabled
                        />
                    </Col>
                    <Col sm={2}>
                        <Form.Label>Lote</Form.Label>
                        <Form.Control
                            value={itbis[0].property.address.lote}
                            disabled
                        />
                    </Col>
                </Row>

                <Row className="mt-2">
                    <Col sm={2}>
                        <Form.Label>Lote Fiscal</Form.Label>
                        <Form.Control
                            value={itbis[0].property.taxAddress.lote}
                            disabled
                        />
                    </Col>
                    <Col sm={2}>
                        <Form.Label>Quadra Fiscal</Form.Label>
                        <Form.Control
                            value={itbis[0].property.taxAddress.quadra}
                            disabled
                        />
                    </Col>
                    <Col sm={2}>
                        <Form.Label>Zona Fiscal</Form.Label>
                        <Form.Control
                            value={itbis[0].property.taxAddress.zone}
                            disabled
                        />
                    </Col>
                </Row>
            </Row>

            <hr />

            <Row>
                <h5>ITBI ({itbis.length})</h5>

                {itbis.map((itbi) => (
                    <>
                        <Row>
                            <h6>Exercício: {itbi.year}</h6>
                            <Row>
                                <Col sm={5}>
                                    <Form.Label>Situação</Form.Label>
                                    <Form.Control
                                        value={itbi.status}
                                        disabled
                                    />
                                </Col>
                                <Col sm={3}>
                                    <Form.Label>Vencimento</Form.Label>
                                    <Form.Control
                                        value={itbi.dueDate}
                                        disabled
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col sm={4}>
                                    <Form.Label>Avaliação</Form.Label>
                                    <Form.Control
                                        value={itbi.valuation}
                                        disabled
                                    />
                                </Col>
                                <Col sm={4}>
                                    <Form.Label>Valor ITBI</Form.Label>
                                    <Form.Control
                                        value={moneyMask(itbi.value)}
                                        disabled
                                    />
                                </Col>
                            </Row>
                        </Row>
                        <hr />
                    </>
                ))}
            </Row>
        </Form.Group>
    );
};
