export interface ILayer {
    id: number;
    cam_nome_geoserver: string;
    cam_desc_webgeo: string;
    cam_ordem?: number;
    cam_ativa_webgeo: boolean;
    cam_ativa_bci: boolean;
    cam_ativa_consultaprevia: boolean;
    cam_ativa_login: boolean;
    cam_cache: boolean;
    created_at: Date;
    updated_at: Date;
    grpcam_id: number;
}
