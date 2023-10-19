import React, { createContext, useMemo, useState } from "react";
import ReactLoading from "react-loading";

// import WebgeoLogo from "../../assets/images/webgeo_logo.png";

import { Background } from "./styles";

export interface LoadingContextData {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    loading: boolean;
}

export const LoadingContext = createContext({} as LoadingContextData);

interface LoadingProviderProps {
    children: React.ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
    children,
}) => {
    const [loading, setLoading] = useState<boolean>(false);

    const loadingContext = useMemo(() => {
        return { setLoading, loading };
    }, [setLoading, loading]);

    return (
        <LoadingContext.Provider value={loadingContext}>
            <Background show={loading}>
                {/* <img src={WebgeoLogo} alt="logo webgeo" /> */}
                <ReactLoading type="spinningBubbles" color="teal" />
            </Background>
            {children}
        </LoadingContext.Provider>
    );
};

export const LocalLoading: React.FC = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <ReactLoading type="spinningBubbles" color="teal" />
        </div>
    );
};
