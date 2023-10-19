import React, { useLayoutEffect, useCallback, useState } from "react";

import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";

import { useLoading } from "../../../../shared/hooks/useLoading";

import { Contact } from "../../../../components/page-releated/consulta-previa/contact";
import { Header } from "../../../../components/page-releated/consulta-previa/header";
import { Disclaimer } from "../../../../components/page-releated/consulta-previa/disclaimer";
// import { Zoneamento } from "../../../components/page-releated/consulta-previa/zoneamento";
// import { Laws } from "../../../components/page-releated/consulta-previa/laws";
import { GlobalStyle } from "../../../../components/page-releated/bci/header/styles";
import { UsoSolo } from "../../../../components/page-releated/consulta-previa/uso-solo";
import { ZonUso } from "../../../../components/page-releated/consulta-previa/zona-uso-ocupacao";
import { Zoneamento } from "../../../../components/page-releated/consulta-previa/zoneamento";
import { ILayers } from "../../../../shared/interfaces/ILayers";
import { LayersApiService } from "../../../../shared/services/api/layers-api.service";
import { PropertiesApiService } from "../../../../shared/services/api/properties-api.service";
import {
    IProperty,
    IPropertyGeom,
} from "../../../../shared/interfaces/IProperties";
import { ParkingLot } from "../../../../components/page-releated/consulta-previa/estacionamento";
import { ZonUsoGrpZoneamento } from "../../../../components/page-releated/consulta-previa/zona-uso-ocupacao/grp-zoneamento";
import { SecondCroqui } from "../../../../components/page-releated/bci/croquis/second-croqui";

export const CarambeiConsultaPrevia: React.FC = () => {
    const { setLoading } = useLoading();

    const { subscription } = useParams<{
        subscription: string | undefined;
    }>();

    const [property, setProperty] = useState<IProperty>();
    const [propertyGeom, setPropertyGeom] = useState<IPropertyGeom>();
    const [layers, setLayers] = useState<ILayers[]>();

    const fetchConsultaPrevia = useCallback(async () => {
        document.title = `CONSULTA PRÉVIA - CARAMBEÍ - ${subscription}`;
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
            <Zoneamento
                propertyInfo={property}
                propertyGeom={propertyGeom}
                layers={layers}
            />
            <ZonUsoGrpZoneamento propertyInfo={property} />
            <div style={{ pageBreakBefore: "always" }} />
            <ParkingLot />
            <Contact />
            {/* {propertyGeom && layers && (
                <SecondCroqui propertyGeom={propertyGeom} layers={layers} />
            )} */}
        </Container>
    );
};
