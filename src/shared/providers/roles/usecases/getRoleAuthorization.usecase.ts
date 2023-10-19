import RolesRepository from "../repository/roles.repository";

const getRoleAuthorizationUsecase =
    (repository = new RolesRepository()) =>
    async (roleId: number) => {
        const authorizations = await repository.getAuthorization(roleId);

        return authorizations;
    };

export default getRoleAuthorizationUsecase;
