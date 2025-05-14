import React from "react";
import { Divisor } from "../../bci/styles";

import { BaseMap, BaseMapProps } from "./base";

export const FullMap: React.FC<Omit<BaseMapProps, "mapId">> = ({
    layers,
    propertyGeom,
}) => {
    return (
        <>
            <Divisor />
            <div className="w-full flex justify-center">
                <div
                    className="mb-2"
                    style={{ width: "750px", height: "450px" }}
                >
                    <BaseMap
                        mapId="full-map"
                        layers={layers}
                        propertyGeom={propertyGeom}
                    />
                </div>
            </div>
        </>
    );
};
