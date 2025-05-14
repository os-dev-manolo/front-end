/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import { Col, Tab, Nav, Row } from "react-bootstrap";

import { BsPencilSquare, BsArrowLeftSquare } from "react-icons/bs";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { IProperty } from "../../../../../shared/interfaces/IProperties";
import { PropertiesApiService } from "../../../../../shared/services/api/properties-api.service";
import { PropertyActions } from "../property-actions";

import { LocalLoading } from "../../../../global";

import { PropertyAndOwner } from "./property-owner";
import { Land } from "./land";
import { Observation } from "./observation";
import { Units } from "./units";
import { Values } from "./values";
import { EditForm } from "./edit-form";

import { ApiErrorHandler } from "../../../../../shared/utils/errors.utils";
import { useAuth } from "../../../../../shared/hooks/useAuth";
import { Files } from "./files";
import { FeaturesEnum } from "../../../../../shared/enums/features.enum";
import { History } from "./history";
import { Facade } from "./facade";
import { ITBI } from "./itbi";
import { Confrontantes } from "./confrontantes-index";

interface PropertieInfoProps {
    subscription: string;
    geomId: number;
    facade?: string | string[];
}

export const PropertyInfo: React.FC<PropertieInfoProps> = ({
    subscription,
    geomId,
    facade,
}) => {
    const { user } = useAuth();

    const [loading, setLoading] = useState<boolean>(false);
    const [propertyInfo, setPropertyInfo] = useState<IProperty>();
    const [enableEdit, setEnableEdit] = useState<boolean>(false);

    const fetchPropertyInfo = useCallback(async (subscription_: string) => {
        try {
            setLoading(true);
            const property = await PropertiesApiService.getProperty({
                subscription: subscription_,
                relations: [
                    "values",
                    "testadas",
                    "geom",
                    "lastvalues",
                    "characteristics",
                ],
            });

            setPropertyInfo(property);
        } catch (err) {
            ApiErrorHandler(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleEnableEdit = () => {
        setEnableEdit(!enableEdit);
    };

    const doAfterSubmitEdit = (newSubscription: string) => {
        fetchPropertyInfo(newSubscription);
        handleEnableEdit();
    };

    useEffect(() => {
        if (subscription.length > 0) {
            fetchPropertyInfo(subscription);
        }
    }, [subscription, fetchPropertyInfo]);

    return (
        <>
            <div className="mb-5 flex space-x-10 justify-center">
                {user.authorizationsByFeatureName[FeaturesEnum.PROPERTIES]
                    ?.canUpdate && (
                    <OverlayTrigger
                        placement="top"
                        overlay={
                            <Tooltip>
                                {enableEdit ? "VOLTAR" : "EDITAR"}
                            </Tooltip>
                        }
                    >
                        <button type="button" onClick={handleEnableEdit}>
                            {enableEdit ? (
                                <BsArrowLeftSquare color="teal" size={30} />
                            ) : (
                                <BsPencilSquare color="teal" size={30} />
                            )}
                        </button>
                    </OverlayTrigger>
                )}
                {propertyInfo && (
                    <PropertyActions
                        property={propertyInfo}
                        disableLocation
                        iconsSize={30}
                    />
                )}
            </div>
            {enableEdit ? (
                <EditForm
                    geomSubscription={subscription}
                    geomId={geomId}
                    propertyInfo={propertyInfo}
                    doAfterSubmit={doAfterSubmitEdit}
                />
            ) : (
                <Tab.Container defaultActiveKey="propertyAndOwner">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item as="button">
                                    <Nav.Link eventKey="propertyAndOwner">
                                        Local/Proprietário
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="button">
                                    <Nav.Link eventKey="land">Terreno</Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="button">
                                    <Nav.Link eventKey="units">
                                        Unidades
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="button">
                                    <Nav.Link eventKey="values">
                                        Valores
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="button">
                                    <Nav.Link eventKey="observations">
                                        Observações
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="button">
                                    <Nav.Link eventKey="facade">
                                        Fotos Fachada
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="button">
                                    <Nav.Link eventKey="files">Anexos</Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="button">
                                    <Nav.Link eventKey="history">
                                        Histórico
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="button">
                                    <Nav.Link eventKey="confrontantes">
                                        Confrontantes
                                    </Nav.Link>
                                </Nav.Item>
                                {/* <Nav.Item as="button">
                                    <Nav.Link eventKey="itbi">ITBI</Nav.Link>
                                </Nav.Item> */}
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            {loading ? (
                                <LocalLoading />
                            ) : (
                                <Tab.Content
                                    style={{
                                        height: "400px",
                                        margin: 0,
                                        overflowX: "hidden",
                                        overflowY: "auto",
                                    }}
                                >
                                    <Tab.Pane eventKey="propertyAndOwner">
                                        <PropertyAndOwner
                                            propertyInfo={propertyInfo}
                                        />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="land">
                                        <Land propertyInfo={propertyInfo} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="units">
                                        <Units propertyInfo={propertyInfo} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="values">
                                        <Values propertyInfo={propertyInfo} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="observations">
                                        <Observation
                                            observation={
                                                propertyInfo?.observacao
                                            }
                                        />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="facade">
                                        <Facade
                                            files={
                                                // eslint-disable-next-line no-nested-ternary
                                                Array.isArray(facade)
                                                    ? facade
                                                    : facade
                                                    ? [facade]
                                                    : undefined
                                            }
                                        />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="files">
                                        <Files files={propertyInfo?.anexos} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="history">
                                        <History
                                            geomId={geomId}
                                            propertyId={propertyInfo?.id}
                                        />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="confrontantes">
                                        <Confrontantes
                                            propertyInfo={propertyInfo}
                                        />
                                    </Tab.Pane>
                                    {/* <Tab.Pane eventKey="itbi">
                                        <ITBI
                                            registration={
                                                propertyInfo?.cadastro
                                            }
                                        />
                                    </Tab.Pane> */}
                                </Tab.Content>
                            )}
                        </Col>
                    </Row>
                </Tab.Container>
            )}
        </>
    );
};
