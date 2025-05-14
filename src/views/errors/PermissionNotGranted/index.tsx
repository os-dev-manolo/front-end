import React from "react";
import { Link } from "react-router-dom";

import { WebgeoLogo } from "../../../shared/assets/logos";

export const PermissionNotGranted: React.FC = () => {
    return (
        <div className="w-screen h-screen flex items-center justify-center flex-column">
            <img src={WebgeoLogo} alt="Logo semv" />
            <div>
                <h5 className="text-teal-900">
                    Ops... parece que você não possui permissão para a página
                    que você está tentando acessar
                    <Link to="/grp">Voltar</Link>
                </h5>
            </div>
        </div>
    );
};
