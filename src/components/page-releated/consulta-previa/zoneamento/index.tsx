import React from "react";

import { Row } from "react-bootstrap";
import { ILayers } from "../../../../shared/interfaces/ILayers";
import {
    IProperty,
    IPropertyGeom,
} from "../../../../shared/interfaces/IProperties";
import { Croqui } from "../../bci/croquis/map";
import { CPMapContainer } from "../../bci/croquis/styles";
import { Divisor } from "../../bci/styles";

interface ZoneamentoProps {
    propertyInfo?: IProperty;
    propertyGeom?: IPropertyGeom;
    layers?: ILayers[];
}

export const Zoneamento: React.FC<ZoneamentoProps> = ({
    propertyInfo,
    propertyGeom,
    layers,
}) => {
    return (
        <>
            <Row>
                <table className="table table-striped">
                    <tbody>
                        {propertyInfo?.inscricaoimobiliaria && (
                            <tr>
                                <td>Inscrição Imobiliária:</td>
                                <td>{propertyInfo?.inscricaoimobiliaria}</td>
                                {propertyGeom && layers && (
                                    <td rowSpan={7} colSpan={2}>
                                        <CPMapContainer>
                                            <Croqui
                                                layers={layers}
                                                propertyGeom={propertyGeom}
                                                padding={[45, 45, 45, 45]}
                                            />
                                        </CPMapContainer>
                                    </td>
                                )}
                            </tr>
                        )}

                        <tr>
                            <td>Data:</td>
                            <td>
                                {new Date(Date.now()).toLocaleDateString(
                                    "pt-BR"
                                )}
                            </td>
                        </tr>
                        {propertyInfo?.logradouronome && (
                            <tr>
                                <td>Endereço:</td>
                                <td>{propertyInfo?.logradouronome}</td>
                            </tr>
                        )}

                        {propertyInfo?.logradouronumero && (
                            <tr>
                                <td>Número:</td>
                                <td>{propertyInfo?.logradouronumero}</td>
                            </tr>
                        )}

                        {propertyInfo?.cep && (
                            <tr>
                                <td>CEP:</td>
                                <td>{propertyInfo?.cep}</td>
                            </tr>
                        )}

                        {propertyInfo?.quadra && (
                            <tr>
                                <td>Quadra:</td>
                                <td>{propertyInfo?.quadra}</td>
                            </tr>
                        )}

                        {propertyInfo?.lote && (
                            <tr>
                                <td>Lote:</td>
                                <td>{propertyInfo?.lote}</td>
                            </tr>
                        )}

                        {propertyInfo?.grp_zoneamento && (
                            <tr>
                                <td>Zoneamento:</td>
                                <td colSpan={2}>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Zoneamento</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    {propertyInfo?.grp_zoneamento?.guia.toUpperCase()}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        )}

                        {propertyInfo?.zoneamento && (
                            <tr>
                                <td>Zoneamento:</td>
                                <td colSpan={2}>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Zoneamento</th>
                                                <th>Observaçao</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    {propertyInfo?.zoneamento?.zona_uso.toUpperCase()}
                                                </td>
                                                <td>
                                                    {
                                                        propertyInfo?.zoneamento
                                                            ?.observacao
                                                    }
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Row>
            <Divisor />
        </>
    );
};
