import React, { createContext, useMemo, useState } from "react";

import Map from "ol/Map";

export interface OlContextData {
    map?: Map;
    setMap: React.Dispatch<React.SetStateAction<Map | undefined>>;
}

interface OlProviderProps {
    children: React.ReactNode;
}

const OlContext = createContext<OlContextData>({} as OlContextData);

const OlProvider: React.FC<OlProviderProps> = ({ children }) => {
    const [map, setMap] = useState<Map>();

    const olContext = useMemo(
        () => ({
            map,
            setMap,
        }),
        [map, setMap]
    );

    return (
        <OlContext.Provider value={olContext}>{children}</OlContext.Provider>
    );
};

export { OlProvider, OlContext };
