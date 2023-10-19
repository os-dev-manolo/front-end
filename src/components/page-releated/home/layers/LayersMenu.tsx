import React, { useEffect } from "react";
import { IoLayers } from "react-icons/io5";
import { RoundedButton } from "../../../global";
import { useLayersSideBar } from "../../../../shared/hooks/useSideBar";
import { useToggle } from "../../../../shared/hooks/useToggle";

export const LayersMenu: React.FC = () => {
    const { setShouldOpen, shouldOpen } = useLayersSideBar();

    const { isActive, toggle } = useToggle();

    const toggleLayersSideBarStatus = () => {
        toggle();
        setShouldOpen(!shouldOpen);
    };

    useEffect(() => {
        if (!shouldOpen && isActive) {
            toggle();
        }
    }, [isActive, shouldOpen, toggle]);

    return (
        <RoundedButton
            onClick={toggleLayersSideBarStatus}
            description="CAMADAS"
            active={isActive}
        >
            <IoLayers size={40} className="inline-block" />
        </RoundedButton>
    );
};
