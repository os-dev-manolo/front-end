import { orderBy } from "lodash";
import React, { useState } from "react";
import { Col, Form, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import {
    BsArrowLeftSquare,
    BsPencilSquare,
    BsPlusSquare,
} from "react-icons/bs";
import { FeaturesEnum } from "../../../../../../shared/enums/features.enum";
import { useAuth } from "../../../../../../shared/hooks/useAuth";
import {
    IProperty,
    IPropertyTestada,
} from "../../../../../../shared/interfaces/IProperties";
import { IConfrontanteProperty } from "../../../../../../shared/providers/property/interfaces/property-confrontantes.interface";
import {
    moneyMask,
    measureMask,
} from "../../../../../../shared/utils/mask.utils";
import { AddProperty } from "./add-property";
import { EditProperty } from "./edit-property";

interface Props {
    doAfterSubmit(subscription: string): void;
    propertyInfo?: IProperty;
    confrontantesInfo: IConfrontanteProperty | undefined;
    clientName: string;
}

export const PropertyConfrontantes: React.FC<Props> = ({
    doAfterSubmit,
    propertyInfo,
    confrontantesInfo,
    clientName,
}) => {
    if (!propertyInfo) {
        <h4>Não encontramos nenhuma informação para esta propriedade</h4>;
    }
    const { user } = useAuth();
    const [enableEdit, setEnableEdit] = useState<boolean>(false);
    const [enableCreate, setEnableCreate] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const lastValues = orderBy(propertyInfo?.lastvalues, "ano", "desc") || [];
    const testadas =
        orderBy(propertyInfo?.testadas, "numerotestada", "asc") || [];

    const tb_resposta = propertyInfo?.characteristics || [];
    let utilizacao = "";

    tb_resposta.forEach((value) => {
        if (value.ordemgrupo === "4" && value.ordempergunta === "3")
            utilizacao = value.resposta;
    });

    let valorVenalTotal = 0;
    const transformValue = (value: string) =>
        Number(
            value.includes(",")
                ? value.replaceAll(".", "").replace(",", ".")
                : value
        );
    if (lastValues[0]) {
        const valorvenalpredial = lastValues[0].valorvenalpredial
            ? transformValue(lastValues[0].valorvenalpredial)
            : 0;
        const valorventalterritorial = lastValues[0].valorvenalterritorial
            ? transformValue(lastValues[0].valorvenalterritorial)
            : 0;
        valorVenalTotal = valorvenalpredial + valorventalterritorial;
    }
    let testada = "";
    testadas.forEach((element: IPropertyTestada, index: number) => {
        if (element.metragem && index > 0) {
            testada += ` x ${element.metragem}`;
        } else if (element.metragem) {
            testada += `${element.metragem}`;
        }
    });
    const handleEnableEdit = () => {
        setEnableEdit(!enableEdit);
        setLoading(!loading);
    };
    const handleEnableCreate = () => {
        setEnableCreate(!enableCreate);
        setLoading(!loading);
    };

    const handleAfterEditSubmit = (subscription: string) => {
        setEnableEdit(!enableEdit);
        setLoading(!loading);
        doAfterSubmit(subscription as string);
    };

    const handleAfterCreateSubmit = (subscription: string) => {
        setEnableCreate(!enableCreate);
        setLoading(!loading);
        doAfterSubmit(subscription as string);
    };
    return (
        <>
            <div className="grid grid-cols-3 grid-rows-1">
                {!confrontantesInfo ? (
                    <OverlayTrigger
                        placement="top"
                        overlay={
                            <Tooltip>
                                {enableCreate ? "VOLTAR" : "ADICIONAR IMÓVEL"}
                            </Tooltip>
                        }
                    >
                        <div className="mb-3 flex space-x-2 justify-center">
                            {user.authorizationsByFeatureName[
                                FeaturesEnum.IMOVEL_CONFRONTANTE
                            ]?.canUpdate && (
                                <button
                                    type="button"
                                    onClick={handleEnableCreate}
                                >
                                    {enableCreate ? (
                                        <BsArrowLeftSquare
                                            color="teal"
                                            size={20}
                                        />
                                    ) : (
                                        <BsPlusSquare color="teal" size={20} />
                                    )}
                                </button>
                            )}
                        </div>
                    </OverlayTrigger>
                ) : (
                    <OverlayTrigger
                        placement="top"
                        overlay={
                            <Tooltip>
                                {enableEdit ? "VOLTAR" : "EDITAR IMÓVEL"}
                            </Tooltip>
                        }
                    >
                        <div className="mb-3 flex space-x-2 justify-center">
                            {user.authorizationsByFeatureName[
                                FeaturesEnum.IMOVEL_CONFRONTANTE
                            ]?.canUpdate && (
                                <button
                                    type="button"
                                    onClick={handleEnableEdit}
                                >
                                    {enableEdit ? (
                                        <BsArrowLeftSquare
                                            color="teal"
                                            size={20}
                                        />
                                    ) : (
                                        <BsPencilSquare
                                            color="teal"
                                            size={20}
                                        />
                                    )}
                                </button>
                            )}
                        </div>
                    </OverlayTrigger>
                )}
            </div>
            {enableCreate && (
                <AddProperty
                    propertyInfo={propertyInfo}
                    doAfterSubmit={handleAfterCreateSubmit}
                    valorVenalTotal={valorVenalTotal || ""}
                    utilizacao={utilizacao || ""}
                    testada={testada || ""}
                />
            )}
            {enableEdit && (
                <EditProperty
                    confrontantesInfo={confrontantesInfo}
                    doAfterSubmit={handleAfterEditSubmit}
                />
            )}

            <Form.Group>
                <Row>
                    {confrontantesInfo?.cadastro && (
                        <Col sm={2}>
                            <Form.Label>Cadastro</Form.Label>
                            <Form.Control
                                value={confrontantesInfo.cadastro}
                                disabled
                            />
                        </Col>
                    )}

                    {confrontantesInfo?.inscricaoimobiliaria && (
                        <Col sm={4}>
                            <Form.Label>Inscrição</Form.Label>
                            <Form.Control
                                value={confrontantesInfo.inscricaoimobiliaria}
                                disabled
                            />
                        </Col>
                    )}
                    {confrontantesInfo?.logradouronome && (
                        <Col>
                            <Form.Label>Endereço</Form.Label>
                            <Form.Control
                                value={`${confrontantesInfo.logradouronome} , ${confrontantesInfo.logradouronumero} - ${confrontantesInfo.bairronome} `}
                                disabled
                            />
                        </Col>
                    )}
                    <Row>
                        {confrontantesInfo?.propnome && (
                            <Col>
                                <Form.Label>Proprietário</Form.Label>
                                <Form.Control
                                    value={confrontantesInfo?.propnome}
                                    disabled
                                />
                            </Col>
                        )}
                        {confrontantesInfo?.valorvenaltotal &&
                            clientName.match("jcz") && (
                                <Col sm={3}>
                                    <Form.Label>
                                        Valor Venal do imóvel
                                    </Form.Label>
                                    <Form.Control
                                        value={moneyMask(
                                            confrontantesInfo.valorvenaltotal
                                        )}
                                        disabled
                                    />
                                </Col>
                            )}
                        {confrontantesInfo?.matricula &&
                            clientName.match("jgv") && (
                                <Col>
                                    <Form.Label>Matricula</Form.Label>
                                    <Form.Control
                                        value={confrontantesInfo?.matricula}
                                        disabled
                                    />
                                </Col>
                            )}
                    </Row>
                    <Row>
                        {confrontantesInfo?.quadra && (
                            <Col>
                                <Form.Label>Quadra</Form.Label>
                                <Form.Control
                                    value={confrontantesInfo?.quadra}
                                    disabled
                                />
                            </Col>
                        )}
                        {confrontantesInfo?.lote && (
                            <Col>
                                <Form.Label>Lote</Form.Label>
                                <Form.Control
                                    value={confrontantesInfo?.lote}
                                    disabled
                                />
                            </Col>
                        )}
                        {confrontantesInfo?.areaterreno && (
                            <Col>
                                <Form.Label>Área do terreno</Form.Label>
                                <Form.Control
                                    value={measureMask(
                                        confrontantesInfo?.areaterreno
                                    )}
                                    disabled
                                />
                            </Col>
                        )}
                        {confrontantesInfo?.areaconstruida && (
                            <Col>
                                <Form.Label>Área construída</Form.Label>
                                <Form.Control
                                    value={measureMask(
                                        confrontantesInfo?.areaconstruida
                                    )}
                                    disabled
                                />
                            </Col>
                        )}
                    </Row>
                    <Row>
                        {confrontantesInfo?.metragem && (
                            <Col>
                                <Form.Label>
                                    <strong>Metragem até a esquina</strong>
                                </Form.Label>
                                <Form.Control
                                    value={`${confrontantesInfo?.metragem} m`}
                                    disabled
                                />
                            </Col>
                        )}
                        {confrontantesInfo?.utilizacao && (
                            <Col>
                                <Form.Label>Utilização</Form.Label>
                                <Form.Control
                                    value={confrontantesInfo?.utilizacao}
                                    disabled
                                />
                            </Col>
                        )}
                        {confrontantesInfo?.testada && (
                            <Col>
                                <Form.Label>Testada</Form.Label>
                                <Form.Control
                                    value={confrontantesInfo?.testada}
                                    disabled
                                />
                            </Col>
                        )}
                    </Row>
                </Row>
            </Form.Group>
        </>
    );
};
