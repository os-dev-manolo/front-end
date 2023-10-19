import React from "react";

import { ClientLogo, WebgeoLogo } from "../../../../shared/assets/logos";

import environments from "../../../../environments";

import { CityInfo, Container, LeftHeader } from "./styles";

export const Header: React.FC = () => {
    return (
        <Container>
            <LeftHeader>
                <div style={{ width: "80px" }}>
                    <img src={ClientLogo} alt="logo cidade" />
                </div>
                <CityInfo>
                    <div style={{ marginLeft: "10px" }}>
                        <h3>{environments.client.nomePrefeitura}</h3>
                        <h3>
                            {environments.webgeo.confrontante?.nomeSecretaria}
                        </h3>
                    </div>
                </CityInfo>
            </LeftHeader>
            <section>
                <img src={WebgeoLogo} alt="logo webgeo" />
            </section>
        </Container>
    );
};
