import React, { useCallback, useEffect, useRef, useState } from "react";

import { Map, View } from "ol";
import { TileWMS } from "ol/source";
import { Tile as TileLayer } from "ol/layer";

import { ILayers } from "../../../../shared/interfaces/ILayers";
import { IPropertyGeom } from "../../../../shared/interfaces/IProperties";
import {
    drawPolygon,
    transformCoordinates,
} from "../../../../shared/utils/ol.utils";

import environments from "../../../../environments";

const {
    webgeo: {
        map: { center, zoom },
    },
    geoserver: { url },
} = environments;

interface ControntanteMapProps {
    propertyGeom?: IPropertyGeom;
    layers?: ILayers[];
}

export const ControntanteMap: React.FC<ControntanteMapProps> = ({
    layers,
    propertyGeom,
}) => {
    const mapRef = useRef(null);

    const [map, setMap] = useState<Map>();

    const loadLayers = useCallback(() => {
        if (!layers) return;
        layers.forEach((layerConfig) => {
            const layer = new TileLayer({
                source: new TileWMS({
                    params: {
                        LAYERS: layerConfig.cam_nome_geoserver,
                        TILE: true,
                    },

                    url: `${url}/wms`,
                }),
                visible: true,
            });
            map?.addLayer(layer);
        });
    }, [layers, map]);

    useEffect(() => {
        if (map) return;

        const options = {
            controls: [],
            interactions: [],
        };

        setMap(new Map(options));
    }, [map]);

    useEffect(() => {
        if (!map || !mapRef.current || !propertyGeom) return;

        map.setTarget(mapRef.current);
        map.setView(new View({ center: transformCoordinates(center), zoom }));

        loadLayers();

        drawPolygon({
            coordinates: propertyGeom.geom,
            map,
            padding: [100, 100, 100, 100],
        });
    }, [map, loadLayers, propertyGeom]);

    return (
        <div className="w-full flex justify-center">
            <div style={{ width: "750px", height: "450px" }}>
                <div ref={mapRef} className="w-full h-full " />
            </div>
        </div>
    );
};
