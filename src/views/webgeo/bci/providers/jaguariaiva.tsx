import "bootstrap/dist/css/bootstrap.min.css";

import React, { useCallback, useState, useLayoutEffect } from "react";

import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";

import { PropertiesApiService } from "../../../../shared/services/api/properties-api.service";
import { IBCIResponse } from "../../../../shared/interfaces/IBCI";

import { Header } from "../../../../components/page-releated/bci/header";
import { PropertieInfo } from "../../../../components/page-releated/bci/propertie-info";
import { PropertyCharact } from "../../../../components/page-releated/bci/property-charact";
import { Testada } from "../../../../components/page-releated/bci/testadas";
import { Values } from "../../../../components/page-releated/bci/values";
import { FirstCroqui } from "../../../../components/page-releated/bci/croquis/first-croqui";
import { SecondCroqui } from "../../../../components/page-releated/bci/croquis/second-croqui";
import { Divisor } from "../../../../components/page-releated/bci/styles";
import { useLoading } from "../../../../shared/hooks/useLoading";
import { LayersApiService } from "../../../../shared/services/api/layers-api.service";
import { GlobalStyle } from "../../../../components/page-releated/bci/header/styles";

export const JaguariaivaBci: React.FC = () => {
    const { setLoading } = useLoading();

    const { subscription } = useParams<{
        subscription: string | undefined;
    }>();

    const [bci, setBci] = useState<IBCIResponse>();

    const fetchBci = useCallback(async () => {
        try {
            setLoading(true);

            if (!subscription) return;

            const [propertyResponse, layersResponse] = await Promise.all([
                PropertiesApiService.getPropertyBci(subscription),
                LayersApiService.getLayers(`where={"cam_ativa_bci":"true"}&`),
            ]);

            setBci({ ...propertyResponse, layers: layersResponse.data });
        } finally {
            setLoading(false);
        }
    }, [subscription, setLoading]);

    useLayoutEffect(() => {
        fetchBci();
    }, [fetchBci]);

    return (
        <>
            <GlobalStyle />
            <Container>
                <Header
                    subscription={bci?.property.inscricaoimobiliaria || ""}
                />
                <div>
                    {bci ? (
                        <>
                            <Divisor />

                            <FirstCroqui
                                layers={bci.layers}
                                propertyGeom={bci.geom}
                            />

                            <Divisor />

                            <PropertieInfo property={bci.property} />

                            <Divisor />

                            <PropertyCharact charact={bci.characteristics} />

                            <Divisor />

                            <Testada testadas={bci.testadas} />

                            <Divisor />

                            <Values values={bci.values} />

                            <Divisor />

                            <SecondCroqui
                                layers={bci.layers}
                                propertyGeom={bci.geom}
                            />
                        </>
                    ) : null}

                    <Divisor />
                </div>
            </Container>
        </>
    );
};
