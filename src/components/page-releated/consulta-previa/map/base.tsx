import React, { useCallback, useEffect, useState } from "react";

import { Map, View } from "ol";
import * as proj from "ol/proj";
import { TileWMS } from "ol/source";
import { Tile as TileLayer } from "ol/layer";

import { ILayers } from "../../../../shared/interfaces/ILayers";
import { IPropertyGeom } from "../../../../shared/interfaces/IProperties";
import { drawPolygon } from "../../../../shared/utils/ol.utils";

import environments from "../../../../environments";

export interface BaseMapProps {
    mapId: string;
    propertyGeom?: IPropertyGeom;
    layers?: ILayers[];
}

export const BaseMap: React.FC<BaseMapProps> = ({
    layers,
    propertyGeom,
    mapId,
}) => {
    const [mapLoaded, setMapLoaded] = useState<boolean>(false);

    const loadLayers = useCallback(
        (map: Map) => {
            if (layers) {
                layers.forEach((layerConfig) => {
                    const layer = new TileLayer({
                        source: new TileWMS({
                            params: {
                                LAYERS: layerConfig.cam_nome_geoserver,
                                TILE: true,
                            },
                            url: `${environments.geoserver.url}/wms`,
                        }),
                        visible: true,
                    });
                    map.addLayer(layer);
                });
            }
        },
        [layers]
    );
    const configureMap = useCallback(() => {
        if (propertyGeom) {
            const map = new Map({
                controls: [],
                interactions: [],
                target: mapId,
                view: new View({
                    center: proj.transform(
                        propertyGeom.geom.coordinates[0][0][0],
                        "EPSG:4326",
                        "EPSG:3857"
                    ),
                    zoom: 18,
                }),
            });

            loadLayers(map);
            drawPolygon({ coordinates: propertyGeom.geom, map });

            setMapLoaded(true);
        }
    }, [propertyGeom, loadLayers, mapId]);

    useEffect(() => {
        if (!mapLoaded) configureMap();
    }, [mapLoaded, configureMap]);

    return <div id={mapId} className="w-full h-full" />;
};
