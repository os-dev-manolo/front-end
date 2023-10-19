import React from "react";

import { ClientLogo, WebgeoLogo } from "../../../../shared/assets/logos";

import environments from "../../../../environments";

import { CityInfo, Container, LeftHeader, PropertyFirstInfo } from "./styles";

interface HeaderProps {
    subscription: string;
}

export const Header: React.FC<HeaderProps> = ({ subscription }) => {
    return (
        <Container>
            <LeftHeader>
                <div style={{ width: "180px" }}>
                    <img src={ClientLogo} alt="logo cidade" />
                </div>
                <CityInfo>
                    <div style={{ marginLeft: "10px" }}>
                        <h3>{environments.client.nomePrefeitura}</h3>
                        <h3>{environments.webgeo.bci.nomeSecretaria}</h3>
                    </div>
                    <PropertyFirstInfo>
                        <p>
                            Inscrição Imobiliária: {subscription}{" "}
                            &nbsp;&nbsp;-&nbsp;&nbsp;
                        </p>
                        <p>
                            DATA:{" "}
                            {new Date(Date.now()).toLocaleDateString("pt-BR")}{" "}
                        </p>
                    </PropertyFirstInfo>
                </CityInfo>
            </LeftHeader>
            <section>
                <img src={WebgeoLogo} alt="logo webgeo" />
            </section>
        </Container>
    );
};
