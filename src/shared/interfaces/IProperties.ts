import { MultiPolygon, Point } from "geojson";

export interface IPropertyTestada {
    bairro?: string;
    cadastro?: string;
    cep?: string;
    id: number;
    logradouro?: string;
    metragem?: string;
    codigosecao?: string;
    numerotestada?: string;
    valorsecao?: string;
}

export interface IPropertyLastValues {
    id: number;
    cadastro?: string;
    ano?: string;
    valorvenalterritorial?: string;
    valorvenalpredial?: string;
    aliquotaterritorial?: string;
    aliquotapredial?: string;
    valorm2terreno?: string;
    valorm2unidade?: string;
}

export interface IPropertyValues {
    id: number;
    inscricaoimobiliaria?: string;
    tipo?: string;
    valorvenalterritorial?: string;
    valorvenalpredial?: string;
    aliquotaterritorial?: string;
    aliquotapredial?: string;
    valorm2territorial?: string;
    valorm2predial?: string;
    ano?: string;
    cadastro?: string;
    totalimposto?: string;
}

export interface IPropertyGeom {
    id: number;
    geom: MultiPolygon;
    centroid: Point;
    inscricao: string;
}

export interface IPerguntasZoneamento {
    id: number;
    texto: string;
    valor: string;
    observacao: string;
    ordem: number;
    idzoneamento: number;
    data_criacao: string;
    data_atualizacao: string;
}
export interface IZoneamento {
    id: number;
    inscricaoimobiliaria: string;
    lei_cnaes_permitidos: string;
    lei_estacionamento: string;
    lei_permissivas: string;
    lei_permitidas: string;
    lei_proibidas: string;
    observacao: string;
    zona: string;
    zona_uso: string;
    zoneamento: string;
    questions?: IPerguntasZoneamento[];
}

export interface IGrpZoneamento {
    id: number;
    guia: string;
    relatorio: string;
    descricao: string;
    permissivas: string;
    permitidas: string;
    proibidas: string;
    data_criacao: string;
    utilizacao: string;
    obs: string;
    estacionamento: string;
    questions?: IPerguntasZoneamento[];
}

export interface ICharacteristics {
    id: number;
    ordemgrupo: string;
    grupo: string;
    ordempergunta: string;
    pergunta: string;
    resposta: string;
    cadastro: string;
    dataatualizada: string;
}

export type IPropertyCharact = Record<string, Array<Record<string, string>>>;

export interface IProperty {
    id: number;
    tipo?: string;
    cadastro?: string;
    inscricaoimobiliaria?: string;
    propcodigo?: string;
    propnome?: string;
    propdocumento?: string;
    respcodigo?: string;
    respnome?: string;
    respdocumento?: string;
    terrenocodigo?: string;
    cep?: string;
    bairrocodigo?: string;
    bairronome?: string;
    logradourocodigo?: string;
    logradouronome?: string;
    logradouronumero?: string;
    quadra?: string;
    lote?: string;
    situacaocadastral?: string;
    areaterreno?: string;
    profundidade?: string;
    observacao?: string;
    areaconstruida?: string;
    areatotalconstruida?: string;
    matricula?: string;
    zonecodigo?: string;
    zonedescricao?: string;
    zoneobservacao?: string;
    zoneprincipal?: string;
    anexos?: string[];
    geom?: IPropertyGeom;
    testadas?: IPropertyTestada[];
    values?: IPropertyValues[];
    lastvalues?: IPropertyLastValues[];
    zoneamento?: IZoneamento;
    grp_zoneamento?: IGrpZoneamento;
    characteristics?: ICharacteristics[];
}
