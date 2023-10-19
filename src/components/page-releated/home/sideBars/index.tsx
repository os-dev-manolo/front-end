import React from "react";

import { useAuth } from "../../../../shared/hooks/useAuth";

import { LayersSideBar } from "../layers/layers-side-bar";
import { SearchSideBar } from "../search/SeachSideBar";

export const SideBars: React.FC = () => {
    const { signed } = useAuth();

    if (!signed) return null;

    return (
        <>
            <LayersSideBar />
            <SearchSideBar />
        </>
    );
};
