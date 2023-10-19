import { useContext } from "react";
import {
    LayersSideBarContext,
    SearchSideBarContext,
    SideBarContextData,
} from "../contexts/side-bars.context";

export function useLayersSideBar(): SideBarContextData {
    const context = useContext(LayersSideBarContext);

    if (!context) {
        throw new Error(
            "useLayersSideBar must be used within an SideBarProvider"
        );
    }

    return context;
}

export function useSearchSideBar(): SideBarContextData {
    const context = useContext(SearchSideBarContext);

    if (!context) {
        throw new Error(
            "useSearchSideBar must be used within an SideBarProvider"
        );
    }

    return context;
}
