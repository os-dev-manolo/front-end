import getGroupsAsOptionsUsecase from "./usecases/getGroupsAsOptions.usecase";
import getRoleAuthorizationUsecase from "./usecases/getRoleAuthorization.usecase";

const RolesComponent = {
    getGroupsAsOptions: getGroupsAsOptionsUsecase(),
    getRoleAuthorization: getRoleAuthorizationUsecase(),
};

Object.freeze(RolesComponent);

export default RolesComponent;
