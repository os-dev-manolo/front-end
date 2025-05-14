import React, { useCallback } from "react";

import "ol/ol.css";
import { RoundedButton } from "../../../global";
import { useOlMap } from "../../../../shared/hooks/useOlMap";
import {
    activeMeasure,
    removeDrawInteraction,
} from "../../../../shared/utils/ol.utils";
import { AreaMeasureIcon } from "../../../../shared/assets/icons";
import { useToggle } from "../../../../shared/hooks/useToggle";

export const AreaMeasureMenu: React.FC = () => {
    const { map } = useOlMap();
    const { isActive, toggle } = useToggle();

    const handdleMeasureArea = useCallback(() => {
        if (!map) return;

        if (isActive) {
            removeDrawInteraction(map);
        } else {
            activeMeasure("Polygon", map);
        }

        toggle();
    }, [map, toggle, isActive]);

    return (
        <RoundedButton
            onClick={handdleMeasureArea}
            description="MEDIR ÁREA"
            active={isActive}
        >
            <img
                src={AreaMeasureIcon}
                alt="apagar"
                className="h-6 w-6 md:h-9 md:w-9 self-center"
            />
        </RoundedButton>
    );
};
