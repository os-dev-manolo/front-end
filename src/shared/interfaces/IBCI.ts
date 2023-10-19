import { ILayers } from "./ILayers";
import {
    IProperty,
    IPropertyCharact,
    IPropertyGeom,
    IPropertyTestada,
    IPropertyValues,
} from "./IProperties";

export interface IBCIResponse {
    layers: ILayers[];
    property: IProperty;
    geom: IPropertyGeom;
    testadas: IPropertyTestada[];
    values: IPropertyValues[];
    characteristics: IPropertyCharact;
}
export interface ICnae {
    cnae: string;
    servicos: string;
    lei: string;
    codigo: string;
}
export interface IArrayCnae {
    element: ICnae[];
}
export interface IConsultaPrevaiResponse {
    layers: ILayers[];
    property: IProperty;
    geom: IPropertyGeom;
    testadas: IPropertyTestada[];
    values: IPropertyValues[];
    characteristics: IPropertyCharact;
    cnaes: ICnae[];
}
