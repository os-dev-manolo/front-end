import React from "react";

import environments from "../../../../../environments";
import { Divisor } from "../../../bci/styles";

export const CarambeiContact: React.FC = () => {
    return (
        <div>
            <Divisor />
            <h2 className="text-center">
                ALERTAS PARA ELABORAÇÃO DE PROJETO JUNTO AO DEPARTAMENTO DE
                URBANISMO
            </h2>
            <Divisor />
            <div className="text-center">
                <p>
                    Solicitações de requerimentos e modelos para aprovação de
                    projetos arquitetônicos podem ser solicitados através do
                    e-mail {environments.webgeo.consultaPrevia?.contact.email}
                </p>

                <p>
                    Telefone:{" "}
                    {environments.webgeo.consultaPrevia?.contact.telefone}
                    <br />
                    Email: {environments.webgeo.consultaPrevia?.contact.email}
                    <br />
                    {environments.webgeo.consultaPrevia?.contact.endereco}
                </p>
            </div>
            <Divisor />
        </div>
    );
};
