import React from "react";

import environments from "../../../../environments";

import { ClientLogo, WebgeoLogo } from "../../../../shared/assets/logos";

export const Header: React.FC = () => {
    return (
        <header className="absolute z-10 w-full h-16 py-5 px-4 rounded-lg top-2 flex items-center justify-between ">
            <div>
                <img
                    className="w-14 h-14 md:h-full md:w-20"
                    src={ClientLogo}
                    alt={`Logo ${environments.client.name}`}
                />
            </div>

            <div>
                <img
                    className="w-32 h-12 md:h-full md:w-full"
                    src={WebgeoLogo}
                    alt="Logo webgeo"
                />
            </div>
        </header>
    );
};
