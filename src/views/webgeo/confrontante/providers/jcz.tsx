import React, { useCallback, useEffect, useState } from "react";

import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { Footer } from "../../../../components/page-releated/confrontante/footer";
import { PropertyInfo } from "../../../../components/page-releated/confrontante/property-info";
import { Header } from "../../../../components/page-releated/confrontante/header";
import { ControntanteMap } from "../../../../components/page-releated/confrontante/map";
import { Confrontacoes } from "../../../../components/page-releated/confrontante/confrontacoes";
import { PropertiesApiService } from "../../../../shared/services/api/properties-api.service";
import { IPropertyGeom } from "../../../../shared/interfaces/IProperties";
import { useLoading } from "../../../../shared/hooks/useLoading";
import { ILayers } from "../../../../shared/interfaces/ILayers";
import { LayersApiService } from "../../../../shared/services/api/layers-api.service";
import {
    IConfrontanteProperty,
    IConfrontanteSide,
} from "../../../../shared/providers/property/interfaces/property-confrontantes.interface";
import { ConfrontanteInfoApiService } from "../../../../shared/services/api/confrontantes-info-api.service";
import { GlobalStyle } from "../../../../components/page-releated/bci/header/styles";
import environments from "../../../../environments";

export const JczConfrontante: React.FC = () => {
    const [layers, setLayers] = useState<ILayers[]>();
    const [confLeft, setConfLeft] = useState<IConfrontanteSide[]>();
    const [confRight, setConfRight] = useState<IConfrontanteSide[]>();
    const [confBack, setConfBack] = useState<IConfrontanteSide[]>();
    const [imovel, setImovel] = useState<IConfrontanteProperty>();
    const [propertyGeom, setPropertyGeom] = useState<IPropertyGeom>();
    const [clientName, setClientName] = useState<string>();

    const { setLoading } = useLoading();

    const { subscription } = useParams<{
        subscription: string | undefined;
    }>();

    const fetchConfrontante = useCallback(async () => {
        try {
            setLoading(true);

            if (!subscription) return;

            const [
                propertyResponse,
                layersResponse,
                imovelInfo,
                confrontacoesLeft,
                confrontacoesRight,
                confrontacoesBack,
            ] = await Promise.all([
                PropertiesApiService.getPropertyConfrontante(subscription),
                LayersApiService.getLayers(
                    `where={"cam_ativa_confrontante":"true"}&`
                ),
                ConfrontanteInfoApiService.getConfrontanteImovel(subscription),
                ConfrontanteInfoApiService.getConfrontanteSide(
                    subscription,
                    "left"
                ),
                ConfrontanteInfoApiService.getConfrontanteSide(
                    subscription,
                    "right"
                ),
                ConfrontanteInfoApiService.getConfrontanteSide(
                    subscription,
                    "back"
                ),
            ]);

            setConfLeft(confrontacoesLeft.data);
            setConfRight(confrontacoesRight.data);
            setConfBack(confrontacoesBack.data);
            setImovel(imovelInfo);
            setLayers(layersResponse.data);
            setPropertyGeom(propertyResponse.geom);
        } finally {
            setLoading(false);
        }
    }, [subscription, setLoading]);

    useEffect(() => {
        fetchConfrontante();
        setClientName(environments.client.name);
    }, [fetchConfrontante]);

    return (
        <Container>
            <GlobalStyle />
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

            <PropertyInfo confrontantesInfo={imovel} clientName={clientName} />

            <div className="w-full flex justify-center mt-10 mb-2">
                <p>
                    Tendo por CONFRONTANTES os cadastros imobiliários
                    identificados na imagem a seguir:
                </p>
            </div>

            <ControntanteMap layers={layers} propertyGeom={propertyGeom} />

            <br />
            <div className="w-full flex justify-center mt-2 mb-2 break-before-page">
                <h3 className="text-justify">CONFRONTAÇÕES</h3>
            </div>

            {confLeft && <Confrontacoes data={confLeft} title=" da Esquerda" />}

            {confRight && (
                <Confrontacoes data={confRight} title=" da Direita" />
            )}

            {confBack && <Confrontacoes data={confBack} title=" dos Fundos" />}

            <Footer />
        </Container>
    );
};
