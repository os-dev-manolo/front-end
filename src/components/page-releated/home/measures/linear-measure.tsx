import React, { useCallback } from "react";

import "ol/ol.css";
import { LinearMeasureIcon } from "../../../../shared/assets/icons";
import { RoundedButton } from "../../../global";
import { useOlMap } from "../../../../shared/hooks/useOlMap";
import {
    activeMeasure,
    removeDrawInteraction,
} from "../../../../shared/utils/ol.utils";
import { useToggle } from "../../../../shared/hooks/useToggle";

export const LinearMeasureMenu: React.FC = () => {
    const { map } = useOlMap();

    const { isActive, toggle } = useToggle();

    const handdleLinearMeasure = useCallback(() => {
        if (!map) return;

        if (isActive) {
            removeDrawInteraction(map);
        } else {
            activeMeasure("LineString", map);
        }

        toggle();
    }, [map, toggle, isActive]);

    return (
        <RoundedButton
            onClick={handdleLinearMeasure}
            description="MEDIR COMPRIMENTO"
            active={isActive}
        >
            <img
                src={LinearMeasureIcon}
                alt="apagar"
                className="h-7 w-7 md:h-10 md:w-10"
            />
        </RoundedButton>
    );
};
