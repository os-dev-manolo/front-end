import React, { useLayoutEffect, useCallback } from "react";

import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";

import { useLoading } from "../../../../shared/hooks/useLoading";

import { Contact } from "../../../../components/page-releated/consulta-previa/contact";
import { Header } from "../../../../components/page-releated/consulta-previa/header";
import { Disclaimer } from "../../../../components/page-releated/consulta-previa/disclaimer";
// import { Zoneamento } from "../../../components/page-releated/consulta-previa/zoneamento";
// import { Laws } from "../../../components/page-releated/consulta-previa/laws";
import { FullMap } from "../../../../components/page-releated/consulta-previa/map/full-map";

export const StandardConsultaPrevia: React.FC = () => {
    const { setLoading } = useLoading();

    const { subscription } = useParams<{
        subscription: string | undefined;
    }>();

    // const [bci, setBci] = useState<IBCIResponse>();

    const fetchConsultaPrevia = useCallback(async () => {
        try {
            setLoading(true);

            // TODO
        } finally {
            setLoading(false);
        }
    }, [setLoading]);

    useLayoutEffect(() => {
        fetchConsultaPrevia();
    }, [fetchConsultaPrevia]);

    return (
        <Container>
            <Header subscription={subscription || ""} />
            <Disclaimer />
            {/* <Zoneamento propertyInfo={} />
            <Laws zoneamento={} /> */}
            <Contact />
            <FullMap />
        </Container>
    );
};
