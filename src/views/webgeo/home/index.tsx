import "bootstrap/dist/css/bootstrap.min.css";

import React, { useEffect, useState } from "react";

import { Presentation } from "../../../components/global";

import { Menus } from "../../../components/page-releated/home/menus";
import { Header } from "../../../components/page-releated/home/header";
import { SideBars } from "../../../components/page-releated/home/sideBars";
import { Map } from "../../../components/page-releated/home/map";

import { SideBarProvider } from "../../../shared/contexts/side-bars.context";
import { OlProvider } from "../../../shared/contexts/ol-map.context";

import { Container } from "./styles";
import { useAuth } from "../../../shared/hooks/useAuth";

export const Home: React.FC = () => {
    const { signed } = useAuth();
    const [showPresentation, setShowPresentation] = useState<boolean>(false);

    useEffect(() => {
        if (!signed) {
            setShowPresentation(true);

            setTimeout(() => setShowPresentation(false), 1000);
        }
    }, [signed]);

    return (
        <Container id="teste">
            <Presentation show={showPresentation} />
            <OlProvider>
                <SideBarProvider>
                    <SideBars />
                    <Header />
                    <Menus />
                    <Map />
                </SideBarProvider>
            </OlProvider>
        </Container>
    );
};
