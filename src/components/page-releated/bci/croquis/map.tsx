import React, { useCallback, useEffect, useRef, useState } from "react";

import { Tile as TileLayer } from "ol/layer";
import { TileWMS } from "ol/source";

import * as ol from "ol";
import { IPropertyGeom } from "../../../../shared/interfaces/IProperties";
import { ILayers } from "../../../../shared/interfaces/ILayers";

import env from "../../../../environments";

import {
    drawPolygon,
    transformCoordinates,
} from "../../../../shared/utils/ol.utils";

const {
    webgeo: {
        map: { center, zoom },
    },
    geoserver: { url },
} = env;

export interface CroquiProps {
    layers: ILayers[];
    propertyGeom: IPropertyGeom;
    padding?: number[];
}

export const Croqui: React.FC<CroquiProps> = ({
    layers,
    propertyGeom,
    padding,
}) => {
    const mapRef = useRef<HTMLDivElement>(null);

    const [map, setMap] = useState<ol.Map>();

    const drawProperty = useCallback(() => {
        drawPolygon({
            coordinates: propertyGeom.geom,
            map: map as ol.Map,
            padding,
        });
    }, [propertyGeom.geom, map, padding]);

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
                    serverType: "geoserver",
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

        setMap(new ol.Map(options));
    }, [map]);

    useEffect(() => {
        if (!map || !mapRef.current) return;

        map.setTarget(mapRef.current);
        map.setView(
            new ol.View({ center: transformCoordinates(center), zoom })
        );

        loadLayers();

        drawProperty();
    }, [map, loadLayers, drawProperty]);

    return <div style={{ width: "100%", height: "100%" }} ref={mapRef} />;
};
