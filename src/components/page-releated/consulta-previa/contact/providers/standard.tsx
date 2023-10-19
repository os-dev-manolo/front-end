import React from "react";

import environments from "../../../../../environments";
import { Divisor } from "../../../bci/styles";

export const StandardContact: React.FC = () => {
    return (
        <div>
            <Divisor />
            <h2>INFORMAÇÕES GERAIS</h2>
            <Divisor />
            <div>
                <p>
                    Solicitações de requerimentos e modelos para aprovação de
                    projetos arquitetônicos podem ser solicitados através do
                    e-mail {environments.webgeo.consultaPrevia?.contact.email}
                </p>

                <p>
                    Plantão Técnico{" "}
                    {
                        environments.webgeo.consultaPrevia?.contact
                            .horarioAtendimento
                    }{" "}
                    <br /> Telefone{" "}
                    {environments.webgeo.consultaPrevia?.contact.telefone}
                    <br />
                    Email: {environments.webgeo.consultaPrevia?.contact.email}
                    <br />
                    {environments.webgeo.consultaPrevia?.contact.endereco}
                </p>
                <div>
                    <h2>Alvará de Construção</h2>
                    <p>
                        Quaisquer obras de construção civil e de infraestrutura,
                        de iniciativa pública ou privada, somente poderão ser
                        iniciadas e executadas após análise e aprovação do
                        projeto e emissão do Alvará de Construção, assim como da
                        concessão de licença por demais órgãos competentes, de
                        acordo com as exigências contidas no Código de Obras
                        Municipal, normas correlatas e regulamentações
                        específicas, sob pena de sanções previstas em lei. O
                        Alvará de Construção terá prazo de validade de 2 (dois)
                        anos, podendo ser prorrogado continuadamente por igual
                        período.
                    </p>

                    <h2>Tapumes e equipamentos de segurança</h2>
                    <p>
                        Os limites do canteiro de obra deverão ser vedados por
                        tapumes com altura mínima de 2,00 m (dois metros) e
                        redes de proteção, os quais não poderão ocupar mais do
                        que a metade da largura do passeio, mantidos livre no
                        mínimo 1,20m (um metro e vinte centímetros) para o fluxo
                        de pedestres.
                    </p>

                    <h2>Vistoria Técnica de Conclusão de Obra - CVCO</h2>
                    <p>
                        Concluída a obra, antes do término da vigência do
                        alvará, o proprietário deverá solicitar ao Município o
                        Certificado de Vistoria de Conclusão de Obra - CVCO da
                        edificação, que deverá ser precedido da vistoria
                        efetuada pelo órgão competente. Para a obtenção do
                        Certificado de Vistoria de Conclusão de Obra - CVCO, a
                        calçada deverá estar executada nos termos do Decreto
                        Municipal 36.559/2021, bem como deverá estar quitado o
                        ISS relativo à obra.
                    </p>
                </div>
            </div>
            <Divisor />
        </div>
    );
};
