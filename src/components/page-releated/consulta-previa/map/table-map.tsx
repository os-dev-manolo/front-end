import React from "react";

import { BaseMap, BaseMapProps } from "./base";

export const TableMap: React.FC<Omit<BaseMapProps, "mapId">> = ({
    layers,
    propertyGeom,
}) => {
    return (
        <div
            className="flex justify-center"
            style={{ width: "600px", height: "500px" }}
        >
            {propertyGeom && (
                <BaseMap
                    mapId="table-map"
                    propertyGeom={propertyGeom}
                    layers={layers}
                />
            )}
        </div>
    );
};
