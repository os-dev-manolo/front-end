import { SelectOptions } from "../../../interfaces/ISelectOptions";
import LayersGroupsRepository from "../repository/layers-group.repository";

const getLayersGroupsAsOptionsUsecase =
    (repository = new LayersGroupsRepository()) =>
    async (): Promise<SelectOptions[]> => {
        const { groups } = await repository.getAll();

        return groups.map((group) => ({
            label: group.grpcam_nome,
            value: group.id,
        }));
    };

export default getLayersGroupsAsOptionsUsecase;
