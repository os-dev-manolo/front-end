export interface ILayersGroups {
    id: number;
    grpcam_nome: string;
    grpcam_ordem: number;
    created_at: Date;
    updated_at: Date;
}

export interface ILayersStyles {
    id: number;
    cames_nome: string;
    cames_nome_geoserver: string;
    cam_id: number;
    created_at?: Date;
    updated_at?: Date;
    layers: ILayers;
}

export interface ILayers {
    id: number;
    cam_nome_geoserver: string;
    cam_desc_webgeo: string;
    cam_ordem?: number;
    cam_ativa_webgeo: boolean;
    cam_ativa_bci: boolean;
    cam_ativa_consultaprevia: boolean;
    cam_ativa_confrontante: boolean;
    cam_ativa_login: boolean;
    cam_cache: boolean;
    created_at: Date;
    updated_at: Date;
    grpcam_id: number;
    group: ILayersGroups;
    styles: ILayersStyles[];
}
