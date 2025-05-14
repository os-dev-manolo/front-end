import React, { useCallback } from "react";
import { useOlMap } from "../../../../shared/hooks/useOlMap";
import { GoogleMapsIcon } from "../../../../shared/assets/icons";
import { RoundedButton } from "../../../global";
import { useToggle } from "../../../../shared/hooks/useToggle";

export const GoogleMapsMenus: React.FC = () => {
    const { map } = useOlMap();

    const { isActive, toggle } = useToggle();

    const toggleGoogleMaps = useCallback(() => {
        toggle();
        const layers = map?.getAllLayers();

        const googleMapsLayer = layers?.find(
            (x) => x.getProperties().title === "googleMaps"
        );

        googleMapsLayer?.setVisible(!googleMapsLayer?.getVisible());
    }, [map, toggle]);

    return (
        <RoundedButton
            onClick={toggleGoogleMaps}
            description="GOOGLE MAPS"
            active={isActive}
        >
            <img
                className="h-7 w-7 md:h-10 md:w-10"
                src={GoogleMapsIcon}
                alt="google maps"
            />
        </RoundedButton>
    );
};
