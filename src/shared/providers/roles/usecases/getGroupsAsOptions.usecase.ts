import RolesRepository from "../repository/roles.repository";

import { SelectOptions } from "../../../interfaces/ISelectOptions";

const getGroupsAsOptionUsecase =
    (repository = new RolesRepository()) =>
    async (): Promise<SelectOptions[]> => {
        const { roles } = await repository.getAll();

        return roles.map((role) => ({
            label: role.description,
            value: role.id,
        }));
    };

export default getGroupsAsOptionUsecase;
