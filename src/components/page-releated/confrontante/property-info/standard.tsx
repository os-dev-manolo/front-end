import React from "react";

import { Row, Col } from "react-bootstrap";
import { IProperty } from "../../../../shared/interfaces/IProperties";

interface PropertyInfoProps {
    propertyInfo?: IProperty;
}

export const PropertyInfoStandard: React.FC<PropertyInfoProps> = ({
    propertyInfo,
}) => {
    return (
        <div className="w-full mt-1 mb-1">
            <Row>
                <Col>PROPRIETÁRIO: {propertyInfo?.propnome}</Col>
            </Row>

            <Row>
                <Col>CADASTRO: {propertyInfo?.cadastro}</Col>
                <Col>INSCRIÇÃO: {propertyInfo?.inscricaoimobiliaria}</Col>
            </Row>

            <Row>
                <Col>LOGRADOURO: {propertyInfo?.logradouronome}</Col>
                <Col>BAIRRO: {propertyInfo?.bairronome}</Col>
            </Row>

            <Row>
                <Col>QUADRA: {propertyInfo?.quadra}</Col>
                <Col>LOTE: {propertyInfo?.lote}</Col>
            </Row>

            <Row>
                {propertyInfo?.areaterreno && (
                    <Col>ÁREA TERRENO: {propertyInfo?.areaterreno} m²</Col>
                )}
                {propertyInfo?.areaconstruida && (
                    <Col>
                        ÁREA CONSTRUÍDA: {propertyInfo?.areaconstruida} m²
                    </Col>
                )}
            </Row>

            <Row>
                {propertyInfo?.matricula && (
                    <Col>
                        MATRÍCULA:
                        {` ${propertyInfo?.matricula}`}
                    </Col>
                )}
            </Row>
        </div>
    );
};
