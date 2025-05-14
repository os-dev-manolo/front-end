import React from "react";
import { Form, Col, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import { FeaturesEnum } from "../../../../../../shared/enums/features.enum";
import { useAuth } from "../../../../../../shared/hooks/useAuth";
import { IConfrontanteSide } from "../../../../../../shared/providers/property/interfaces/property-confrontantes.interface";
import { measureMask } from "../../../../../../shared/utils/mask.utils";

interface Siderops {
    askDelete(subscription: string): void;
    confrontanteInfo: IConfrontanteSide[] | undefined;
    clientName: string;
}

export const SideGeneric: React.FC<Siderops> = ({
    askDelete,
    confrontanteInfo,
    clientName,
}) => {
    const { user } = useAuth();

    const handleDeleteButton = (id: string) => {
        askDelete(id);
    };

    return (
        <div>
            {confrontanteInfo && (
                <div>
                    {confrontanteInfo.map((propertyInfo) => {
                        return (
                            <div key={propertyInfo.id}>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={
                                        <Tooltip>EXCLUIR CONFRONTAÇÃO</Tooltip>
                                    }
                                >
                                    <div className="mb-3 flex space-x-2 justify-center">
                                        {user.authorizationsByFeatureName[
                                            FeaturesEnum.INFO_CONFRONTANTE
                                        ]?.canUpdate && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    handleDeleteButton(
                                                        propertyInfo.id
                                                    );
                                                }}
                                            >
                                                <FaTrashAlt
                                                    color="tomato"
                                                    size={20}
                                                />
                                            </button>
                                        )}
                                    </div>
                                </OverlayTrigger>
                                {propertyInfo?.tipo === "address" ? (
                                    <Form.Group>
                                        <Row>
                                            {propertyInfo?.logradouronome && (
                                                <Col>
                                                    <Form.Label>
                                                        Logradouro
                                                    </Form.Label>
                                                    <Form.Control
                                                        value={`${propertyInfo.logradouronome}`}
                                                        disabled
                                                    />
                                                </Col>
                                            )}
                                            {propertyInfo?.logradouronumero && (
                                                <Col>
                                                    <Form.Label>
                                                        Número
                                                    </Form.Label>
                                                    <Form.Control
                                                        value={`${propertyInfo.logradouronumero}`}
                                                        disabled
                                                    />
                                                </Col>
                                            )}
                                            {propertyInfo?.bairronome && (
                                                <Col>
                                                    <Form.Label>
                                                        Bairro
                                                    </Form.Label>
                                                    <Form.Control
                                                        value={
                                                            propertyInfo.bairronome
                                                        }
                                                        disabled
                                                    />
                                                </Col>
                                            )}
                                        </Row>
                                        <Row>
                                            {propertyInfo?.propnome && (
                                                <Col>
                                                    <Form.Label>
                                                        Proprietário
                                                    </Form.Label>
                                                    <Form.Control
                                                        value={
                                                            propertyInfo?.propnome
                                                        }
                                                        disabled
                                                    />
                                                </Col>
                                            )}
                                        </Row>

                                        <Row>
                                            {propertyInfo?.quadra && (
                                                <Col>
                                                    <Form.Label>
                                                        Quadra
                                                    </Form.Label>
                                                    <Form.Control
                                                        value={
                                                            propertyInfo?.quadra
                                                        }
                                                        disabled
                                                    />
                                                </Col>
                                            )}
                                            {propertyInfo?.lote && (
                                                <Col>
                                                    <Form.Label>
                                                        Lote
                                                    </Form.Label>
                                                    <Form.Control
                                                        value={
                                                            propertyInfo?.lote
                                                        }
                                                        disabled
                                                    />
                                                </Col>
                                            )}
                                            {propertyInfo?.areaterreno && (
                                                <Col>
                                                    <Form.Label>
                                                        Área do terreno
                                                    </Form.Label>
                                                    <Form.Control
                                                        value={measureMask(
                                                            propertyInfo?.areaterreno
                                                        )}
                                                        disabled
                                                    />
                                                </Col>
                                            )}
                                            {propertyInfo?.areaconstruida && (
                                                <Col>
                                                    <Form.Label>
                                                        Área construída
                                                    </Form.Label>
                                                    <Form.Control
                                                        value={measureMask(
                                                            propertyInfo?.areaconstruida
                                                        )}
                                                        disabled
                                                    />
                                                </Col>
                                            )}
                                        </Row>
                                        <Row>
                                            {clientName === "jgv" && (
                                                <Col>
                                                    <Form.Label>
                                                        Matrícula
                                                    </Form.Label>
                                                    <Form.Control
                                                        value={
                                                            propertyInfo?.matricula_confrontacao
                                                        }
                                                        disabled
                                                    />
                                                </Col>
                                            )}
                                            <Col>
                                                <Form.Label>
                                                    <strong>
                                                        Medida da Confrontação
                                                    </strong>
                                                </Form.Label>
                                                <Form.Control
                                                    value={`${propertyInfo.medida}`}
                                                    disabled
                                                />
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                ) : (
                                    <Form.Group>
                                        <Row>
                                            {propertyInfo?.cadastro_confrontacao && (
                                                <Col>
                                                    <Form.Label>
                                                        Cadastro
                                                    </Form.Label>
                                                    <Form.Control
                                                        value={
                                                            propertyInfo.cadastro_confrontacao
                                                        }
                                                        disabled
                                                    />
                                                </Col>
                                            )}

                                            {propertyInfo?.inscricao_confrontacao && (
                                                <Col>
                                                    <Form.Label>
                                                        Inscrição
                                                    </Form.Label>
                                                    <Form.Control
                                                        value={
                                                            propertyInfo?.inscricao_confrontacao
                                                        }
                                                        disabled
                                                    />
                                                </Col>
                                            )}
                                        </Row>
                                        <Row>
                                            {propertyInfo?.logradouronome && (
                                                <Col>
                                                    <Form.Label>
                                                        Logradouro
                                                    </Form.Label>
                                                    <Form.Control
                                                        value={`${propertyInfo.logradouronome}`}
                                                        disabled
                                                    />
                                                </Col>
                                            )}
                                            {propertyInfo?.logradouronumero && (
                                                <Col>
                                                    <Form.Label>
                                                        Número
                                                    </Form.Label>
                                                    <Form.Control
                                                        value={`${propertyInfo?.logradouronumero}`}
                                                        disabled
                                                    />
                                                </Col>
                                            )}
                                            {propertyInfo?.bairronome && (
                                                <Col>
                                                    <Form.Label>
                                                        Bairro
                                                    </Form.Label>
                                                    <Form.Control
                                                        value={
                                                            propertyInfo.bairronome
                                                        }
                                                        disabled
                                                    />
                                                </Col>
                                            )}
                                        </Row>
                                        <Row>
                                            {propertyInfo?.propnome && (
                                                <Col>
                                                    <Form.Label>
                                                        Proprietário
                                                    </Form.Label>
                                                    <Form.Control
                                                        value={
                                                            propertyInfo?.propnome
                                                        }
                                                        disabled
                                                    />
                                                </Col>
                                            )}
                                        </Row>

                                        <Row>
                                            {propertyInfo?.quadra && (
                                                <Col>
                                                    <Form.Label>
                                                        Quadra
                                                    </Form.Label>
                                                    <Form.Control
                                                        value={
                                                            propertyInfo?.quadra
                                                        }
                                                        disabled
                                                    />
                                                </Col>
                                            )}
                                            {propertyInfo?.lote && (
                                                <Col>
                                                    <Form.Label>
                                                        Lote
                                                    </Form.Label>
                                                    <Form.Control
                                                        value={
                                                            propertyInfo?.lote
                                                        }
                                                        disabled
                                                    />
                                                </Col>
                                            )}
                                            {propertyInfo?.areaterreno && (
                                                <Col>
                                                    <Form.Label>
                                                        Área do terreno
                                                    </Form.Label>
                                                    <Form.Control
                                                        value={measureMask(
                                                            propertyInfo?.areaterreno
                                                        )}
                                                        disabled
                                                    />
                                                </Col>
                                            )}
                                            {propertyInfo?.areaconstruida && (
                                                <Col>
                                                    <Form.Label>
                                                        Área construída
                                                    </Form.Label>
                                                    <Form.Control
                                                        value={measureMask(
                                                            propertyInfo?.areaconstruida
                                                        )}
                                                        disabled
                                                    />
                                                </Col>
                                            )}
                                        </Row>
                                        <Row>
                                            {clientName === "jgv" && (
                                                <Col>
                                                    <Form.Label>
                                                        Matrícula
                                                    </Form.Label>
                                                    <Form.Control
                                                        value={
                                                            propertyInfo?.matricula_confrontacao
                                                        }
                                                        disabled
                                                    />
                                                </Col>
                                            )}
                                            <Col>
                                                <Form.Label>
                                                    <strong>
                                                        Medida da Confrontação
                                                    </strong>
                                                </Form.Label>
                                                <Form.Control
                                                    value={`${propertyInfo.medida}`}
                                                    disabled
                                                />
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                )}

                                <hr />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
