import Draw from "ol/interaction/Draw";
import VectorLayer from "ol/layer/Vector";
import React from "react";
import { EraseIcon } from "../../../../shared/assets/icons";
import { useOlMap } from "../../../../shared/hooks/useOlMap";
import { RoundedButton } from "../../../global";

export const EreaseMenu: React.FC = () => {
    const { map } = useOlMap();

    // remove todas as camadas que são to tipo vetor, interações que são desenhos e todos os overlays
    const removeInteractionsAndOverlays = () => {
        map?.getOverlays().clear();
        const interactions = map?.getInteractions().getArray();
        const layers = map?.getAllLayers();

        interactions?.forEach((interaction) => {
            if (interaction instanceof Draw) {
                map?.removeInteraction(interaction);
            }
        });

        layers?.forEach((layer) => {
            if (layer instanceof VectorLayer) {
                map?.removeLayer(layer);
            }
        });
    };

    return (
        <RoundedButton
            onClick={removeInteractionsAndOverlays}
            description="LIMPAR"
        >
            <img
                src={EraseIcon}
                alt="apagar"
                className="h-6 w-6 md:h-9 md:w-9"
            />
        </RoundedButton>
    );
};
