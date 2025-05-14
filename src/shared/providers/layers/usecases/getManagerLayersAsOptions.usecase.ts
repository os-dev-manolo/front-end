import { SelectOptions } from "../../../interfaces/ISelectOptions";
import LayersManagerRepository from "../repository/layers-manager.repository";

const getManagerLayersAsOptionsUsecase =
    (repository = new LayersManagerRepository()) =>
    async (): Promise<SelectOptions[]> => {
        const { layers } = await repository.getAll();

        return layers.map((layer) => ({ label: layer.name, value: layer.id }));
    };

export default getManagerLayersAsOptionsUsecase;
