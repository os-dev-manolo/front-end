import React from "react";

import { Row, Col } from "react-bootstrap";
import { IConfrontanteProperty } from "../../../../shared/providers/property/interfaces/property-confrontantes.interface";

interface PropertyInfoProps {
    confrontantesInfo?: IConfrontanteProperty;
    clientName?: string;
}

export const PropertyInfo: React.FC<PropertyInfoProps> = ({
    confrontantesInfo,
    clientName,
}) => {
    return (
        <div className="w-full mt-1 mb-1">
            <Row>
                <Col>PROPRIETÁRIO: {confrontantesInfo?.propnome}</Col>
            </Row>

            <Row>
                <Col>CADASTRO: {confrontantesInfo?.cadastro}</Col>
                <Col>INSCRIÇÃO: {confrontantesInfo?.inscricaoimobiliaria}</Col>
            </Row>

            <Row>
                <Col>LOGRADOURO: {confrontantesInfo?.logradouronome}</Col>
                <Col>BAIRRO: {confrontantesInfo?.bairronome}</Col>
            </Row>

            <Row>
                <Col>QUADRA: {confrontantesInfo?.quadra}</Col>
                <Col>LOTE: {confrontantesInfo?.lote}</Col>
            </Row>

            <Row>
                {confrontantesInfo?.areaterreno && (
                    <Col>ÁREA TERRENO: {confrontantesInfo?.areaterreno} m²</Col>
                )}
                {confrontantesInfo?.areaconstruida && (
                    <Col>
                        ÁREA CONSTRUÍDA: {confrontantesInfo?.areaconstruida} m²
                    </Col>
                )}
            </Row>

            <Row>
                {confrontantesInfo?.testada && (
                    <Col>TESTADA: {confrontantesInfo?.testada}</Col>
                )}
                {confrontantesInfo?.metragem && (
                    <Col>
                        METRAGEM ATÉ A ESQUINA: {confrontantesInfo?.metragem} m
                    </Col>
                )}
            </Row>

            <Row>
                {clientName === "jcz"
                    ? confrontantesInfo?.valorvenaltotal && (
                          <Col>
                              VALOR VENAL TOTAL:
                              {` R$${confrontantesInfo?.valorvenaltotal}`}
                          </Col>
                      )
                    : confrontantesInfo?.matricula && (
                          <Col>
                              MATRÍCULA:
                              {` ${confrontantesInfo?.matricula}`}
                          </Col>
                      )}
                {confrontantesInfo?.utilizacao && (
                    <Col>UTILIZAÇÃO: {confrontantesInfo?.utilizacao}</Col>
                )}
            </Row>
        </div>
    );
};
