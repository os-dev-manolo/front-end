import React from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

import { useToggle } from "../../../../../shared/hooks/useToggle";
import { ILayers } from "../../../../../shared/interfaces/ILayers";
import { LayerRow } from "../layers-side-bar-row";

export const LayersGroup: React.FC<{
    group?: string;
    layers: ILayers[];
    doAfterSelectLayer(layer: string): void;
    selectedLayer?: string;
}> = ({ layers, group, doAfterSelectLayer, selectedLayer }) => {
    const { isActive, toggle } = useToggle();

    return (
        <div className="mt-2">
            {group !== "undefined" ? (
                <button
                    className={`flex items-center ${
                        isActive ? "text-teal-800" : "text-slate-700"
                    } font-medium text-lg`}
                    onClick={toggle}
                    type="button"
                >
                    {group}
                    {isActive ? (
                        <FiChevronUp className="ml-2" />
                    ) : (
                        <FiChevronDown className="ml-2" />
                    )}
                </button>
            ) : null}

            <div
                className={`${
                    !isActive && group !== "undefined" ? "hidden" : "block"
                } space-y-2`}
            >
                {layers.map((layer) => (
                    <LayerRow
                        key={layer.id}
                        {...layer}
                        doAfterSelectLayer={doAfterSelectLayer}
                        selectedLayer={selectedLayer}
                    />
                ))}
            </div>
        </div>
    );
};
