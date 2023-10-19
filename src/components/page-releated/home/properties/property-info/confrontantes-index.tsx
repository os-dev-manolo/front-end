import React, { useCallback, useEffect, useState } from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import environments from "../../../../../environments";
import { IProperty } from "../../../../../shared/interfaces/IProperties";
import { IConfrontanteProperty } from "../../../../../shared/providers/property/interfaces/property-confrontantes.interface";
import { ConfrontanteInfoApiService } from "../../../../../shared/services/api/confrontantes-info-api.service";
import { ApiErrorHandler } from "../../../../../shared/utils/errors.utils";
import { PropertyConfrontantes } from "./confrontantes/property";
import { SideConfrontacoes } from "./confrontantes/side-confrontacoes";

interface ConfrontanteProps {
    propertyInfo?: IProperty;
}

export const Confrontantes: React.FC<ConfrontanteProps> = ({
    propertyInfo,
}) => {
    const [enableEdit, setEnableEdit] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [clientName, setClientName] = useState<string>();
    const [subscription, setSubscription] = useState<string>();
    const [confrontantesInfo, setConfrontantesInfo] =
        useState<IConfrontanteProperty>();

    // let subscription = propertyInfo?.inscricaoimobiliaria || undefined;
    // const register = propertyInfo?.cadastro || undefined;

    const fetchConfrontantesInfo = useCallback(
        async (subscription_: string) => {
            try {
                setLoading(true);
                const confrontanteInfo =
                    await ConfrontanteInfoApiService.getConfrontanteImovel(
                        subscription_
                    );

                setConfrontantesInfo(confrontanteInfo);
            } catch (err) {
                ApiErrorHandler(err, "warn");
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const handleEnableEdit = () => {
        setEnableEdit(!enableEdit);
        setLoading(!loading);
    };

    const doAfterSubmitEdit = () => {
        if (subscription) {
            fetchConfrontantesInfo(subscription);
        }
        handleEnableEdit();
    };

    useEffect(() => {
        setClientName(environments.client.name);
        if (propertyInfo) {
            switch (clientName) {
                case "jgv":
                    setSubscription(propertyInfo.cadastro);
                    break;
                case "jcz":
                    setSubscription(propertyInfo.inscricaoimobiliaria);
                    break;
                default:
                    setSubscription("");
                    break;
            }
        }
    }, [clientName, propertyInfo]);

    useEffect(() => {
        if (subscription && subscription.length > 0) {
            fetchConfrontantesInfo(subscription);
        }
    }, [fetchConfrontantesInfo, subscription]);

    return (
        <Tab.Container defaultActiveKey="property">
            <Row>
                <Col sm={2}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item as="button">
                            <Nav.Link eventKey="property">Imóvel</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item as="button">
                            <Nav.Link eventKey="left">Lado Esquerdo</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={2}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item as="button">
                            <Nav.Link eventKey="back">Fundos</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item as="button">
                            <Nav.Link eventKey="right">Lado Direito</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
            </Row>
            {!loading && clientName && (
                <Row>
                    <Col>
                        <Tab.Content
                            style={{
                                padding: "2px",
                                overflowX: "hidden",
                                overflowY: "auto",
                            }}
                        >
                            <Tab.Pane eventKey="property">
                                <PropertyConfrontantes
                                    propertyInfo={propertyInfo}
                                    confrontantesInfo={confrontantesInfo}
                                    doAfterSubmit={doAfterSubmitEdit}
                                    clientName={clientName}
                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey="left">
                                <SideConfrontacoes
                                    side="left"
                                    subscription={subscription}
                                    doAfterSubmit={doAfterSubmitEdit}
                                    clientName={clientName}
                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey="back">
                                <SideConfrontacoes
                                    side="back"
                                    subscription={subscription}
                                    doAfterSubmit={doAfterSubmitEdit}
                                    clientName={clientName}
                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey="right">
                                <SideConfrontacoes
                                    side="right"
                                    subscription={subscription}
                                    doAfterSubmit={doAfterSubmitEdit}
                                    clientName={clientName}
                                />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            )}
        </Tab.Container>
    );
};
