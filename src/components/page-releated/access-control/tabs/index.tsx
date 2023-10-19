import React, {
    MutableRefObject,
    useCallback,
    useEffect,
    useState,
} from "react";
import { Col, Tab, Nav, Row } from "react-bootstrap";
import { FormHandles, Scope } from "@unform/core";

import { Form } from "@unform/web";
import { FeatureAndRessources } from "../features-ressources";
import {
    WebgeoFeaturesLabels,
    WebgeoRessourcesLabels,
} from "../../../../config/shared/AccessManagerConfig";
import { MenusConfig } from "../../../../config/grp/MenusConfig";

import { IFormData, TabsProps } from "./interfaces";
import { formatGrantedAccess } from "./utils";
import { LayersApiService } from "../../../../shared/services/api/layers-api.service";
import { FeaturesEnum } from "../../../../shared/enums/features.enum";

export const Tabs = React.forwardRef<FormHandles, TabsProps>(
    ({ roleAllowedFeatures, onSubmit }, formRef) => {
        const [grpLabels, setGrpLabels] = useState<
            Record<string, { label: string; order: number; actions: string[] }>
        >({});
        const [layersLabel, setLayersLabel] =
            useState<Record<string, string>>();

        useEffect(() => {
            const submenus = MenusConfig.flatMap((menu) => menu.submenus);
            const features = submenus.reduce(
                (acc, submenu, index) =>
                    Object.assign(acc, {
                        [submenu.feature]: {
                            label: submenu.description,
                            order: index,
                            actions: ["create", "read", "remove", "update"],
                        },
                    }),
                {} as Record<
                    string,
                    { label: string; order: number; actions: string[] }
                >
            );

            features[FeaturesEnum.GRP_ACCESS] = {
                label: "Acesso ao grp",
                order: 1,
                actions: ["read"],
            };

            features[FeaturesEnum.PROJECTS] = {
                label: "Projetos",
                order: 100,
                actions: ["read", "create", "update"],
            };
            setGrpLabels(features);
        }, []);

        const fetchLayersLabel = useCallback(async () => {
            const layers = await LayersApiService.getLayers();

            const labels = layers.data.reduce(
                (acc, layer) =>
                    Object.assign(acc, {
                        [layer.cam_nome_geoserver]: layer.cam_desc_webgeo,
                    }),
                {} as Record<string, string>
            );

            setLayersLabel(labels);
        }, []);

        useEffect(() => {
            fetchLayersLabel();
        }, [fetchLayersLabel]);

        const formatForm = (data: IFormData) => {
            const webgeoAccess = formatGrantedAccess(data.webgeo).filter(
                (access) => access.actions.length
            );
            const grpAccess = formatGrantedAccess(data.grp).filter(
                (access) => access.actions.length
            );

            onSubmit([...webgeoAccess, ...grpAccess]);
        };

        return (
            <Tab.Container defaultActiveKey="webgeo">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item as="button">
                                <Nav.Link
                                    eventKey="webgeo"
                                    className="text-left"
                                >
                                    WEBGEO
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="button">
                                <Nav.Link eventKey="grp" className="text-left">
                                    GRP
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Form ref={formRef} onSubmit={formatForm}>
                            <Tab.Content>
                                <Tab.Pane eventKey="webgeo">
                                    <Scope path="webgeo">
                                        <FeatureAndRessources
                                            roleAllowedFeatures={
                                                roleAllowedFeatures
                                            }
                                            formRef={
                                                formRef as MutableRefObject<FormHandles | null>
                                            }
                                            parentScope="webgeo"
                                            featuresLabels={
                                                WebgeoFeaturesLabels
                                            }
                                            ressourcesLabels={{
                                                ...WebgeoRessourcesLabels,
                                                ...layersLabel,
                                            }}
                                        />
                                    </Scope>
                                </Tab.Pane>
                                <Tab.Pane eventKey="grp">
                                    <Scope path="grp">
                                        <FeatureAndRessources
                                            roleAllowedFeatures={
                                                roleAllowedFeatures
                                            }
                                            formRef={
                                                formRef as MutableRefObject<FormHandles | null>
                                            }
                                            parentScope="grp"
                                            featuresLabels={grpLabels}
                                        />
                                    </Scope>
                                </Tab.Pane>
                            </Tab.Content>
                        </Form>
                    </Col>
                </Row>
            </Tab.Container>
        );
    }
);
