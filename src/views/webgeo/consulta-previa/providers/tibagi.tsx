import React, { useLayoutEffect, useCallback, useState } from "react";

import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";

import { useLoading } from "../../../../shared/hooks/useLoading";

import { Header } from "../../../../components/page-releated/consulta-previa/header";
import { Disclaimer } from "../../../../components/page-releated/consulta-previa/disclaimer";
import { PropertiesApiService } from "../../../../shared/services/api/properties-api.service";
import {
    IProperty,
    IPropertyGeom,
} from "../../../../shared/interfaces/IProperties";
import { ILayers } from "../../../../shared/interfaces/ILayers";
import { LayersApiService } from "../../../../shared/services/api/layers-api.service";
import { GlobalStyle } from "../../../../components/page-releated/bci/header/styles";

export const TibagiConsultaPrevia: React.FC = () => {
    const { setLoading } = useLoading();

    const { subscription } = useParams<{
        subscription: string | undefined;
    }>();

    const [property, setProperty] = useState<IProperty>();
    const [propertyGeom, setPropertyGeom] = useState<IPropertyGeom>();
    const [layers, setLayers] = useState<ILayers[]>();

    const fetchConsultaPrevia = useCallback(async () => {
        document.title = `CONSULTA PRÉVIA - TIBAGI - ${subscription}`;
        try {
            setLoading(true);

            if (subscription) {
                const {
                    property: propertyResponse,
                    geom: propertyGeomResponse,
                } = await PropertiesApiService.getPropertyConsultaPrevia(
                    subscription
                );
                const layersResponse = await LayersApiService.getLayers(
                    `where={"cam_ativa_consultaprevia":"true"}&`
                );

                setProperty(propertyResponse);

                setPropertyGeom(propertyGeomResponse);

                setLayers(layersResponse.data);
            }
        } finally {
            setLoading(false);
        }
    }, [setLoading, subscription]);

    useLayoutEffect(() => {
        fetchConsultaPrevia();
    }, [fetchConsultaPrevia]);

    return (
        <Container>
            <GlobalStyle />
            <Header subscription={subscription || ""} />
            <Disclaimer />
            {/* <Zoneamento
                propertyInfo={property}
                propertyGeom={propertyGeom}
                layers={layers}
            />
            <div style={{ pageBreakBefore: "always" }} />
            <ZonUso propertyInfo={property} />
            <UsoSolo propertyInfo={property} />
            <div style={{ pageBreakBefore: "always" }} />
            <ParkingLot />
            <div style={{ pageBreakBefore: "always" }} />
            <Contact /> */}
        </Container>
    );
};
