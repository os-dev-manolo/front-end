import Authorizarion from "../../authorization/entities/authorization.entity";
import RolesDatasource from "../datasources/roles.datasource";
import Role from "../entities/role.entity";

export default class RolesRepository {
    private readonly datasource;

    constructor(datasource = new RolesDatasource()) {
        this.datasource = datasource;
    }

    async getAll() {
        const { data, paginate } = await this.datasource.getAll();

        const roles = data.map((role) => Role(role));

        return { roles, paginate };
    }

    async getAuthorization(roleId: number) {
        const authorizations = await this.datasource.getAuthorization(roleId);

        return authorizations.map((authorization) =>
            Authorizarion(authorization)
        );
    }
}
