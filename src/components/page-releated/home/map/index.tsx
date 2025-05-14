import React, { useEffect, useCallback } from "react";

import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import WMTS from "ol/source/WMTS";
import TilegridWMTS from "ol/tilegrid/WMTS";
import OlMap from "ol/Map";
import { View } from "ol";

import environments from "../../../../environments";

import { useOlMap } from "../../../../shared/hooks/useOlMap";

import {
    findLayerByTitle,
    googleMapsLayer,
    openStreetMapLayer,
    transformCoordinates,
    wmtsSettings,
} from "../../../../shared/utils/ol.utils";

import { LayersApiService } from "../../../../shared/services/api/layers-api.service";
import { useAuth } from "../../../../shared/hooks/useAuth";
import { StoragesService } from "../../../../shared/storages/storages.service";
import { storageConstants } from "../../../../shared/utils/storage.utils";

interface OLMapProps {
    children?: React.ReactNode;
}

const {
    geoserver: { url },
    webgeo: {
        map: { center, zoom },
    },
} = environments;

let hasBeenRendered = 0;

export const Map: React.FC<OLMapProps> = ({ children }) => {
    const { user } = useAuth();

    const { map, setMap } = useOlMap();
    const { signed } = useAuth();

    const loadLayers = useCallback(async () => {
        const layersReponse = await LayersApiService.getLayers(
            "orderBy=ASC:cam_ordem&"
        );

        layersReponse.data.forEach(({ cam_nome_geoserver, cam_cache }) => {
            // caso o usuário esteja logado só alterar a visibilidade das camadas habilitadas na tela de entrada
            const layer = findLayerByTitle(
                map || ({} as OlMap),
                cam_nome_geoserver
            );

            const savedLayers = StoragesService.localStorage.getValue(
                storageConstants.ENABLED_LAYERS(user?.id)
            );

            const isLayerVisible = savedLayers
                ? (JSON.parse(savedLayers).includes(
                      cam_nome_geoserver
                  ) as boolean)
                : false;

            if (layer) return layer?.setVisible(signed ? isLayerVisible : true);

            // caso a camada tenha a opção de cache gerar wmts
            const source = cam_cache
                ? new WMTS({
                      url: `${url}/gwc/service/wmts`,
                      layer: cam_nome_geoserver,
                      matrixSet: "EPSG:4326",
                      format: "image/jpeg",
                      tileGrid: new TilegridWMTS({
                          tileSize: [256, 256],
                          extent: [-180.0, -90.0, 180.0, 90.0],
                          origin: [-180.0, 90.0],
                          resolutions: wmtsSettings.resolutions,
                          matrixIds: wmtsSettings.matrixIds,
                      }),
                      crossOrigin: "Anonymous",
                      projection: "EPSG:4326",
                      style: "",
                  })
                : new TileWMS({
                      url: `${url}/wms`,
                      params: { LAYERS: cam_nome_geoserver },
                      serverType: "geoserver",
                      crossOrigin: "Anonymous",
                      hidpi: false,
                      transition: 0,
                  });

            return map?.addLayer(
                new TileLayer({
                    properties: {
                        title: cam_nome_geoserver,
                    },
                    source,
                    visible: signed ? isLayerVisible : true,
                })
            );
        });
    }, [map, signed, user]);

    useEffect(() => {
        if (map) {
            loadLayers();
        }
    }, [loadLayers, map]);

    useEffect(() => {
        if (hasBeenRendered < 1) {
            setMap(
                new OlMap({
                    controls: [],
                    layers: [openStreetMapLayer(), googleMapsLayer()],
                    target: "main-map",
                    view: new View({
                        center: transformCoordinates(center),
                        zoom,
                    }),
                })
            );
            hasBeenRendered += 1;
        }
    }, [setMap]);

    return (
        <div
            style={{ position: "relative", width: "100%", height: "100%" }}
            id="main-map"
        >
            {children}
        </div>
    );
};
