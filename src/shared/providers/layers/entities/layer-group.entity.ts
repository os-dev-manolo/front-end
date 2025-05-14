import { ILayersGroup } from "../interfaces/layer-group";

export default function LayerGroup(data: ILayersGroup) {
    const layerGroupEntity = { ...data };

    Object.freeze(layerGroupEntity);

    return layerGroupEntity;
}
