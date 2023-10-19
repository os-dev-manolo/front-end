import React from "react";

import { Divisor } from "../../bci/styles";

export const Disclaimer: React.FC = () => {
    return (
        <div>
            <div className="text-center">
                <h5>CONSULTA PARA REQUERER ALVARÁ DE CONSTRUÇÃO</h5>
                <p>
                    ESTA CONSULTA POSSUI INFORMAÇÕES DE CARÁTER PRELIMINAR.
                    DADOS OFICIAIS SERÃO FORNECIDOS MEDIANTE ABERTURA DE
                    PROTOCOLO.
                </p>
            </div>

            <Divisor />

            <div className="text-center">
                <p>
                    DEVERÁ SER CONSULTADA A SECRETARIA MUNICIPAL DE
                    DESENVOLVIMENTO URBANO - COM RELAÇÃO ÀS DIRETRIZES DO
                    SISTEMA VIÁRIO, ÁREAS DE PRESERVAÇÃO PERMANENTE E FAIXAS DE
                    SERVIDÃO
                </p>
            </div>

            <Divisor />
        </div>
    );
};
