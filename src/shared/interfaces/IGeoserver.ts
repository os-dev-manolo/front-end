export interface GeoServerSymbolProps {
    stroke?: string;
    "stroke-opacity"?: string;
    fill?: string;
    "fill-opacity"?: string;
}

export interface GeoServerPoint {
    graphics: [GeoServerSymbolProps];
}

export interface ILegendsResponse {
    Legend: {
        rules: {
            name: string;
            title: string;
            filter: string;
            symbolizers: (
                | Record<"Point", GeoServerPoint>
                | Record<"Polygon" | "Line", GeoServerSymbolProps>
            )[];
        }[];
    }[];
}
