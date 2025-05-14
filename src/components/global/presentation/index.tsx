import React from "react";

import { ClientBrasao, SemvLogo } from "../../../shared/assets/logos";

import { Background } from "./styles";

interface PresentationProps {
    show: boolean;
}

export const Presentation: React.FC<PresentationProps> = ({ show }) => {
    return (
        <Background show={show}>
            <div className="grid grid-cols-1 gap-4 justify-items-center content-center md:grid-cols-2">
                <img className="max-w-xl" src={ClientBrasao} alt="logo" />
                <img className="max-w-sm max-h-24" src={SemvLogo} alt="logo" />
            </div>
        </Background>
    );
};
