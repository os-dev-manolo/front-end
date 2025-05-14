/* eslint-disable @typescript-eslint/no-explicit-any */
import { MultiPolygon as IMultiPolygon } from "geojson";

import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import TileImage from "ol/source/TileImage";
import { transform } from "ol/proj";
import { LineString, Polygon, MultiPolygon } from "ol/geom";
import { getLength, getArea } from "ol/sphere";
import { Feature, Map, MapBrowserEvent, Overlay } from "ol";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Fill, Stroke, Style } from "ol/style";
import CircleStyle from "ol/style/Circle";
import Draw from "ol/interaction/Draw";
import { unByKey } from "ol/Observable";
import * as proj from "ol/proj";
import proj4 from "proj4";
import { Source, TileWMS } from "ol/source";
import axios from "axios";
import proj4List from "./proj4.utils";
import environments from "../../environments";
import {
    GeoServerPoint,
    GeoServerSymbolProps,
    ILegendsResponse,
} from "../interfaces/IGeoserver";
import { IWeGeoLegends } from "../interfaces/ILegends";

export const wmtsSettings = {
    resolutions: [
        8.58306884765625e-5, 4.291534423828125e-5, 2.1457672119140625e-5,
        // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
        1.0728836059570312e-5, 5.364418029785156e-6, 2.682209014892578e-6,
        1.341104507446289e-6, 6.705522537231445e-7, 3.3527612686157227e-7,
    ],
    matrixIds: [
        "EPSG:4326:13",
        "EPSG:4326:14",
        "EPSG:4326:15",
        "EPSG:4326:16",
        "EPSG:4326:17",
        "EPSG:4326:18",
        "EPSG:4326:19",
        "EPSG:4326:20",
        "EPSG:4326:21",
    ],
};

export const openStreetMapLayer = () =>
    new TileLayer({
        source: new XYZ({
            crossOrigin: "Anonymous",
            url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        }),
    });

export const googleMapsLayer = () =>
    new TileLayer({
        source: new TileImage({
            crossOrigin: "Anonymous",
            url: "http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga",
        }),
        properties: { title: "googleMaps" },
        visible: false,
    });

export const transformCoordinates = (coordinates: number[]) => {
    return transform(coordinates, "EPSG:4326", "EPSG:3857");
};

export const getLineMeasure = (line: LineString) => {
    const length = getLength(line);
    return `${Math.round(length * 100) / 100} m`;
};

export const getAreaMeasure = (polygon: Polygon) => {
    const area = getArea(polygon);
    return `${Math.round(area * 100) / 100} m<sup>2</sup>`;
};

export const getCoordinates = (e: MapBrowserEvent<PointerEvent>): number[] => {
    e.preventDefault();
    const coord = proj.transform(
        [e.coordinate[0], e.coordinate[1]],
        "EPSG:3857",
        "EPSG:4326"
    );
    return coord;
};

export const findLayerByTitle = (map: Map, title: string) => {
    return map
        .getAllLayers()
        .find((layer) => layer.getProperties().title === title);
};

const pickSymbolProps = (
    props: GeoServerSymbolProps
): Omit<IWeGeoLegends, "name" | "title" | "filter"> => ({
    fill: props.fill,
    fillOpacity: props["fill-opacity"],
    stroke: props.stroke,
    strokeOpacity: props["stroke-opacity"],
});

export const getLayerLegend = async (
    source?: Source | null,
    styleName?: string,
    resolution?: number
): Promise<IWeGeoLegends[]> => {
    if (!source || !(source instanceof TileWMS)) return [];
    try {
        const legendUrl = source.getLegendUrl(resolution, {
            FORMAT: "application/json",
            STYLE: styleName,
        }) as string;

        const { data } = await axios.get<ILegendsResponse>(legendUrl);

        return data.Legend.flatMap((legend) => {
            return legend.rules.map((rule) => {
                const geoServerSymbolProps = Object.values(
                    rule.symbolizers[0]
                )[0];
                const symbolProps = pickSymbolProps(
                    (geoServerSymbolProps as GeoServerPoint).graphics?.find(
                        (graph) => graph.fill
                    ) || (geoServerSymbolProps as GeoServerSymbolProps)
                );

                return {
                    name: rule.name,
                    title: rule.title,
                    filter: rule.filter,
                    ...symbolProps,
                };
            });
        });
    } catch (err) {
        return [];
    }
};

export const vectorLayer = () => {
    const source = new VectorSource();

    const vector = new VectorLayer({
        source,
        style: new Style({
            fill: new Fill({
                color: "rgba(255, 255, 255, 0.2)",
            }),
            stroke: new Stroke({
                color: "#ffcc33",
                width: 2,
            }),
            image: new CircleStyle({
                radius: 7,
                fill: new Fill({
                    color: "#ffcc33",
                }),
            }),
        }),
    });

    return { source, vector };
};

export const drawPolygon = ({
    coordinates,
    map,
    padding,
    originCoordinatesPattern = environments.webgeo.coordinatesPattern,
}: {
    coordinates: IMultiPolygon;
    map: Map;
    padding?: number[];
    originCoordinatesPattern?: string;
}) => {
    const { source, vector } = vectorLayer();

    map.addLayer(vector);

    proj4.defs([
        proj4List["EPSG:4326"],
        proj4List[originCoordinatesPattern],
        proj4List["EPSG:3857"],
    ]);

    const coordinatesTransformer = proj4(originCoordinatesPattern, "EPSG:3857");

    const transformedCoordinates = coordinates.coordinates[0].map(
        (coordinate) =>
            coordinate.map((points) => coordinatesTransformer.forward(points))
    );

    const polygon = new MultiPolygon([transformedCoordinates]);

    const feature = new Feature({
        geometry: polygon,
    });

    const view = map.getView();

    if (padding) {
        view.fit(polygon as MultiPolygon, { padding });
    } else {
        view.fit(polygon as MultiPolygon);
    }

    source.addFeature(feature);
};

export const removeDrawInteraction = (map: Map) => {
    const interactions = map.getInteractions();

    interactions.forEach((interaction) => {
        if (interaction instanceof Draw) {
            map.removeInteraction(interaction);
        }
    });
};

export const activeMeasure = (type: "Polygon" | "LineString", map: Map) => {
    removeDrawInteraction(map);

    const { source, vector } = vectorLayer();

    let sketch: Feature | null;
    let measureTooltipElement: HTMLElement | null;
    let measureTooltip: Overlay | null;

    /**
     * Creates a new measure tooltip
     */
    function createMeasureTooltip() {
        if (measureTooltipElement) {
            measureTooltipElement.parentNode?.removeChild(
                measureTooltipElement
            );
        }
        measureTooltipElement = document.createElement("div");
        measureTooltipElement.className = "ol-tooltip ol-tooltip-measure";
        measureTooltip = new Overlay({
            element: measureTooltipElement,
            offset: [0, -15],
            positioning: "bottom-center",
            stopEvent: false,
            insertFirst: false,
        });
        map.addOverlay(measureTooltip);
    }

    map.addLayer(vector);

    let draw; // global so we can remove it later

    function addInteraction() {
        draw = new Draw({
            source,
            type,
            style: new Style({
                fill: new Fill({
                    color: "rgba(255, 255, 255, 0.2)",
                }),
                stroke: new Stroke({
                    color: "rgba(0, 0, 0, 0.5)",
                    lineDash: [10, 10],
                    width: 2,
                }),
                image: new CircleStyle({
                    radius: 5,
                    stroke: new Stroke({
                        color: "rgba(0, 0, 0, 0.7)",
                    }),
                    fill: new Fill({
                        color: "rgba(255, 255, 255, 0.2)",
                    }),
                }),
            }),
        });
        map.addInteraction(draw);

        createMeasureTooltip();

        let listener: any;
        draw.on("drawstart", (evt: any) => {
            // set sketch
            sketch = evt.feature;

            let tooltipCoord = evt.coordinate;

            listener = sketch?.getGeometry()?.on("change", (evt2) => {
                const geom = evt2.target;
                let output = "";
                if (geom instanceof Polygon) {
                    output = getAreaMeasure(geom);
                    tooltipCoord = geom.getInteriorPoint().getCoordinates();
                } else if (geom instanceof LineString) {
                    output = getLineMeasure(geom);
                    tooltipCoord = geom.getLastCoordinate();
                }
                if (measureTooltipElement) {
                    measureTooltipElement.innerHTML = output;
                }

                measureTooltip?.setPosition(tooltipCoord);
            });
        });

        draw.on("drawend", () => {
            if (measureTooltipElement) {
                measureTooltipElement.className = "tooltip-static";
            }

            measureTooltip?.setOffset([0, -7]);
            // unset sketch
            sketch = null;
            // unset tooltip so that a new one can be created
            measureTooltipElement = null;
            createMeasureTooltip();
            unByKey(listener);
        });
    }

    addInteraction();
};
