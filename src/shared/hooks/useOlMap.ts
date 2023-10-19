import { useContext } from "react";
import { OlContext, OlContextData } from "../contexts/ol-map.context";

export function useOlMap(): OlContextData {
    const context = useContext(OlContext);

    if (!context) {
        throw new Error("useOlMap must be used within an OlMapProvider");
    }

    return context;
}
