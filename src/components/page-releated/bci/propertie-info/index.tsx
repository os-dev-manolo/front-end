import React from "react";
import { Row, Col } from "react-bootstrap";

import { IProperty } from "../../../../shared/interfaces/IProperties";
import { measureMask } from "../../../../shared/utils/mask.utils";

import { Divisor, DotLine, Topic } from "../styles";

interface PropertieInfoProps {
    property: IProperty;
}

export const PropertieInfo: React.FC<PropertieInfoProps> = ({ property }) => {
    return (
        <div>
            <Topic>
                <h5>Informações do Imóvel</h5>
            </Topic>
            <Row>
                <Col>
                    <p>Cadastro: {property.cadastro}</p>
                </Col>
                <Col>
                    <p>Insc. Imob.: {property.inscricaoimobiliaria}</p>
                </Col>
                <Col>
                    <p>Insc. Imob. Anterior: ---</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>Matrícula: {property.matricula}</p>
                </Col>
                <Col />
                <Col />
            </Row>

            <Divisor />

            <Topic>
                <h5>Endereço do Imóvel</h5>
            </Topic>
            <Row>
                <Col>
                    <p>
                        Logradouro:{" "}
                        {property.logradouronumero
                            ? `${property.logradouronome}, ${property.logradouronumero}`
                            : property.logradouronome}
                    </p>
                </Col>
                <Col>
                    <p>Bairro: {property.bairronome}</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>Quadra do Loteamento: {property.quadra}</p>
                </Col>
                <Col>
                    <p>Lote do Loteamento: {property.lote}</p>
                </Col>
            </Row>

            <Divisor />

            <div>
                <Topic>
                    <h5>Informações da Unidade</h5>
                </Topic>
                <Row>
                    <Col>
                        <p>Área Terreno: {measureMask(property.areaterreno)}</p>
                    </Col>
                    <Col>
                        <p>
                            Profundidade:{" "}
                            {property.profundidade?.trim()
                                ? `${(+property.profundidade).toFixed(2)} m`
                                : property.profundidade}
                        </p>
                    </Col>
                    <Col>
                        <p>
                            Área const. Unidade:{" "}
                            {measureMask(property.areaconstruida)}
                        </p>
                    </Col>
                    <Col>
                        <p>
                            Área total const.:{" "}
                            {measureMask(property.areatotalconstruida)}
                        </p>
                    </Col>
                </Row>
            </div>

            <Divisor />

            <div>
                <Topic>
                    <h5>Informações do Proprietário</h5>
                </Topic>
                <Row>
                    <Col>
                        <p>Responsável legal: {property.respnome}</p>
                    </Col>
                    <Col>
                        <p>Resp. Documento: {property.respdocumento}</p>
                    </Col>
                </Row>

                <DotLine />

                <Row>
                    <Col>
                        <p>Proprietário: {property.propnome}</p>
                    </Col>
                    <Col>
                        <p>Prop. Documento: {property.propdocumento}</p>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <p>CEP: {property.cep}</p>
                    </Col>
                    <Col>
                        <p>Bairro: {property.bairronome}</p>
                    </Col>
                    <Col>
                        <p>Logradouro: {property.logradouronome}</p>
                    </Col>
                </Row>
            </div>

            <Divisor />

            <div>
                <Topic>
                    <h5>Zoneamento</h5>
                </Topic>
                <Row>
                    <Col>
                        <p>Código</p>
                    </Col>
                    <Col>
                        <p>Descrição</p>
                    </Col>
                    <Col>
                        <p>Principal</p>
                    </Col>
                    <Col>
                        <p>Observação</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>{property.zonecodigo}</p>
                    </Col>
                    <Col>
                        <p>{property.zonedescricao}</p>
                    </Col>
                    <Col>
                        <p>{property.zoneprincipal}</p>
                    </Col>
                    <Col>
                        <p>{property.zoneobservacao}</p>
                    </Col>
                </Row>
            </div>
        </div>
    );
};
