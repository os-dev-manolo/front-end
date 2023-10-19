import React, { useLayoutEffect, useCallback, useState } from "react";

import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";

import { useLoading } from "../../../../shared/hooks/useLoading";

import { Contact } from "../../../../components/page-releated/consulta-previa/contact";
import { Header } from "../../../../components/page-releated/consulta-previa/header";
import { Disclaimer } from "../../../../components/page-releated/consulta-previa/disclaimer";
import { Zoneamento } from "../../../../components/page-releated/consulta-previa/zoneamento";
// import { Laws } from "../../../components/page-releated/consulta-previa/laws";
import { Tipologias } from "../../../../components/page-releated/consulta-previa/tipologias";
import { MedidasMitigadoras } from "../../../../components/page-releated/consulta-previa/medidas-mitigadoras";
import { FullMap } from "../../../../components/page-releated/consulta-previa/map/full-map";
import { PropertiesApiService } from "../../../../shared/services/api/properties-api.service";
import {
    IProperty,
    IPropertyGeom,
} from "../../../../shared/interfaces/IProperties";
import { ILayers } from "../../../../shared/interfaces/ILayers";

export const CastroConsultaPrevia: React.FC = () => {
    const { setLoading } = useLoading();

    const { subscription } = useParams<{
        subscription: string | undefined;
    }>();

    const [property, setProperty] = useState<IProperty>();
    const [propertyGeom, setPropertyGeom] = useState<IPropertyGeom>();
    const [layers, setLayers] = useState<ILayers[]>();

    const fetchConsultaPrevia = useCallback(async () => {
        try {
            setLoading(true);

            if (subscription) {
                // TODO INFORMACOES DO ZONEAMENTO
                const {
                    layers: layersResponse,
                    property: propertyResponse,
                    geom: propertyGeomResponse,
                } = await PropertiesApiService.getPropertyConsultaPrevia(
                    subscription
                );

                setProperty(propertyResponse);

                setPropertyGeom(propertyGeomResponse);

                setLayers(layersResponse);
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
            <Header subscription={subscription || ""} />
            <Disclaimer />
            <Zoneamento
                propertyInfo={property}
                propertyGeom={propertyGeom}
                layers={layers}
            />
            {/* <Laws zoneamento={} /> */}
            <Tipologias />
            <Contact />
            <MedidasMitigadoras />
            <FullMap propertyGeom={propertyGeom} layers={layers} />
        </Container>
    );
};
