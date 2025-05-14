import React, { createContext, useMemo, useState } from "react";

export interface SideBarContextData {
    shouldOpen: boolean;
    setShouldOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SideBarProviderProps {
    children: React.ReactNode;
}

const LayersSideBarContext = createContext<SideBarContextData>(
    {} as SideBarContextData
);

const SearchSideBarContext = createContext<SideBarContextData>(
    {} as SideBarContextData
);

const SideBarProvider: React.FC<SideBarProviderProps> = ({ children }) => {
    const [openLayersSideBar, setOpenLayersSideBar] = useState<boolean>(false);
    const [openSearchSideBar, setOpenSearchSideBar] = useState<boolean>(false);

    const layersSideBarContext = useMemo(
        () => ({
            shouldOpen: openLayersSideBar,
            setShouldOpen: setOpenLayersSideBar,
        }),
        [openLayersSideBar, setOpenLayersSideBar]
    );

    const searchSideBarContext = useMemo(
        () => ({
            shouldOpen: openSearchSideBar,
            setShouldOpen: setOpenSearchSideBar,
        }),
        [openSearchSideBar, setOpenSearchSideBar]
    );

    return (
        <LayersSideBarContext.Provider value={layersSideBarContext}>
            <SearchSideBarContext.Provider value={searchSideBarContext}>
                {children}
            </SearchSideBarContext.Provider>
        </LayersSideBarContext.Provider>
    );
};

export { SideBarProvider, SearchSideBarContext, LayersSideBarContext };
