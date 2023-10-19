import { createContext, useContext } from "react";
import PropertyProvider from "../providers/property";

export const PropertyContext =
    createContext<typeof PropertyProvider>(PropertyProvider);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PropertiesProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <PropertyContext.Provider value={PropertyProvider}>
            {children}
        </PropertyContext.Provider>
    );
};

export const useProperties = () => useContext(PropertyContext);
