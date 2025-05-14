import { useContext } from "react";
import {
    IStateManagerContextData,
    StateManagerContext,
} from "../contexts/state-manager.context";

export function useStateManager(): IStateManagerContextData {
    const context = useContext(StateManagerContext);

    if (!context) {
        throw new Error(
            "useStateManager must be used within an StateManagerProvider"
        );
    }

    return context;
}
