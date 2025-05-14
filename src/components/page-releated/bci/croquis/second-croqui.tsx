import React from "react";

import { IPropertyGeom } from "../../../../shared/interfaces/IProperties";
import { ILayers } from "../../../../shared/interfaces/ILayers";
import { Container, MapContainer } from "./styles";

import { Croqui } from "./map";

export interface SecondCroquiProps {
    layers: ILayers[];
    propertyGeom: IPropertyGeom;
}

export const SecondCroqui: React.FC<SecondCroquiProps> = ({
    layers,
    propertyGeom,
}) => {
    return (
        <Container>
            <MapContainer>
                <Croqui
                    layers={layers}
                    propertyGeom={propertyGeom}
                    padding={[180, 180, 180, 180]}
                />
            </MapContainer>
        </Container>
    );
};
