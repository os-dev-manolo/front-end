import React from "react";

import { IPropertyGeom } from "../../../../shared/interfaces/IProperties";
import { ILayers } from "../../../../shared/interfaces/ILayers";
import { Container, MapContainer } from "./styles";

import { Croqui } from "./map";

export interface FirstCroqui {
    layers: ILayers[];
    propertyGeom: IPropertyGeom;
}

export const FirstCroqui: React.FC<FirstCroqui> = ({
    layers,
    propertyGeom,
}) => {
    return (
        <Container>
            <h2>BOLETIM CADASTRO IMOBILIÁRIO</h2>
            <MapContainer>
                <Croqui layers={layers} propertyGeom={propertyGeom} />
            </MapContainer>
        </Container>
    );
};
