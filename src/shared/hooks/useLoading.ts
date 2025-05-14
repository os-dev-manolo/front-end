import { useContext } from "react";
import {
    LoadingContext,
    LoadingContextData,
} from "../../components/global/loading";

export function useLoading(): LoadingContextData {
    const context = useContext(LoadingContext);

    if (!context) {
        throw new Error("useLoading must be used within an LoadingProvider");
    }

    return context;
}
