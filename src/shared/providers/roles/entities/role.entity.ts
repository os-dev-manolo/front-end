import { IRoles } from "../interfaces/roles.interface";

export interface IRoleEntity {
    readonly id: number;
    readonly description: string;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}

export default function Role(data: IRoles): IRoleEntity {
    const role: IRoleEntity = {
        id: data.id,
        description: data.role_descricao,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
    };

    Object.freeze(role);

    return role;
}
