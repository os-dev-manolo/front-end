import React from "react";

import { WebgeoLogo } from "../../../shared/assets/logos";

export const NotFound: React.FC = () => {
    return (
        <div className="w-screen h-screen flex items-center justify-center flex-column">
            <img src={WebgeoLogo} alt="Logo semv" />
            <div>
                <h5 className="text-teal-900">
                    Ops... parece que a página que você está tentando acessar
                    não existe
                </h5>
            </div>
        </div>
    );
};
