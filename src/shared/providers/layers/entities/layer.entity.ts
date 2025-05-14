import { ILayer } from "../interfaces/layer.interface";

export interface ILayerEntity {
    readonly id: number;
    readonly geoserverName: string;
    readonly name: string;
    readonly order?: number;
    readonly webgeo: boolean;
    readonly bci: boolean;
    readonly consultaprevia: boolean;
    readonly login: boolean;
    readonly cache: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly groupId: number;
}

export default function Layer(data: ILayer): ILayerEntity {
    const layerEntity: ILayerEntity = {
        bci: data.cam_ativa_bci,
        cache: data.cam_cache,
        consultaprevia: data.cam_ativa_consultaprevia,
        createdAt: data.created_at,
        geoserverName: data.cam_nome_geoserver,
        groupId: data.grpcam_id,
        id: data.id,
        login: data.cam_ativa_login,
        name: data.cam_desc_webgeo,
        updatedAt: data.updated_at,
        webgeo: data.cam_ativa_webgeo,
        order: data.cam_ordem,
    };

    Object.freeze(layerEntity);

    return layerEntity;
}
