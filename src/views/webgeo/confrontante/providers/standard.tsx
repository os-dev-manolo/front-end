import React, { useCallback, useEffect, useState } from "react";

import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { Footer } from "../../../../components/page-releated/confrontante/footer";
import { Header } from "../../../../components/page-releated/confrontante/header";
import { ControntanteMap } from "../../../../components/page-releated/confrontante/map";

import { PropertiesApiService } from "../../../../shared/services/api/properties-api.service";
import {
    IProperty,
    IPropertyGeom,
} from "../../../../shared/interfaces/IProperties";
import { useLoading } from "../../../../shared/hooks/useLoading";
import { ILayers } from "../../../../shared/interfaces/ILayers";
import { LayersApiService } from "../../../../shared/services/api/layers-api.service";
import { PropertyInfoStandard } from "../../../../components/page-releated/confrontante/property-info/standard";

export const StandardConfrontante: React.FC = () => {
    const [property, setProperty] = useState<IProperty>();
    const [layers, setLayers] = useState<ILayers[]>();
    const [propertyGeom, setPropertyGeom] = useState<IPropertyGeom>();

    const { setLoading } = useLoading();

    const { subscription } = useParams<{
        subscription: string | undefined;
    }>();

    const fetchConfrontante = useCallback(async () => {
        try {
            setLoading(true);

            if (!subscription) return;

            const [propertyResponse, layersResponse] = await Promise.all([
                PropertiesApiService.getPropertyConfrontante(subscription),
                LayersApiService.getLayers(`where={"cam_ativa_bci":"true"}&`),
            ]);

            setProperty(propertyResponse.property);
            setLayers(layersResponse.data);
            setPropertyGeom(propertyResponse.geom);
        } finally {
            setLoading(false);
        }
    }, [subscription, setLoading]);

    useEffect(() => {
        fetchConfrontante();
    }, [fetchConfrontante]);

    return (
        <Container>
            <Header />
            <div className="w-full flex justify-center mt-2 mb-2">
                <h3 className="text-justify">INFORME DE CONFRONTANTES</h3>
            </div>

            <p className="text-justify">
                &emsp;&emsp;Informa-se para fins a que se destinam, que o
                terreno abaixo identificado, com base nos registros de cadastros
                imobiliários, juntamente com o sistema de georeferenciamento tem
                por características:
            </p>

            <PropertyInfoStandard propertyInfo={property} />

            <div className="w-full flex justify-center mt-10 mb-2">
                <p>
                    Tendo por CONFRONTANTES os cadastros imobiliários
                    identificados na imagem a seguir:
                </p>
            </div>

            <ControntanteMap layers={layers} propertyGeom={propertyGeom} />

            <div className="w-full flex justify-center">
                <small>
                    Este informe não tem valor para fins de registro em Cartório
                    de Registro de Imóveis e não substitui laudo de
                    profissional.
                </small>
            </div>
            <Footer />
        </Container>
    );
};
