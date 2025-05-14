import React from "react";

import { Divisor } from "../../bci/styles";

import environments from "../../../../environments";

interface IZoneamento {
    description: string;
    obs: string;
    zoneamentoInfo: {
        name: string;
        quantity: string;
        observation: string;
    }[];
    usageLaws: string;
    parkingLaws: string;
}

interface LawsProps {
    zoneamento: IZoneamento[];
}

export const Laws: React.FC<LawsProps> = ({ zoneamento }) => {
    return (
        <div>
            <div>
                <h5>ZONA DE USO E OCUPAÇÃO</h5>
                <Divisor />
            </div>
            {zoneamento.map((zone) => {
                const isAPP =
                    zone.description === "ÁREA DE PRESERVAÇÃO PERMANENTE";

                return (
                    <>
                        {!isAPP && <h5>{zone.description}</h5>}
                        <p className={isAPP ? "text-red" : undefined}>
                            {zone.description}
                        </p>
                        {!isAPP && (
                            <>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>Nome</th>
                                            <th>Quantidade</th>
                                            <th>Observação</th>
                                        </tr>
                                        {zone.zoneamentoInfo.map(
                                            ({
                                                name,
                                                observation,
                                                quantity,
                                            }) => (
                                                <tr>
                                                    <td>{name}</td>
                                                    <td>{quantity}</td>
                                                    <td>{observation}</td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                                <Divisor />
                                <h5>
                                    PARÂMETROS DE USO DO SOLO -{" "}
                                    {
                                        environments.webgeo.consultaPrevia
                                            ?.leiUsoDeSolo
                                    }
                                </h5>
                                <Divisor />
                                <p>{zone.usageLaws}</p>
                                <Divisor />
                                <h5>
                                    VAGAS PARA ESTACIONAMENTO anexo à lei
                                    {
                                        environments.webgeo.consultaPrevia
                                            ?.leiVagasDeEstacionamento
                                    }
                                </h5>
                                <Divisor />
                                {zone.parkingLaws}
                                <Divisor />
                            </>
                        )}
                    </>
                );
            })}
        </div>
    );
};
