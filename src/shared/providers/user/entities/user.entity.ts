import { Dictionary, keyBy } from "lodash";
import { IUser } from "../interfaces/user.interface";
import { IAuthorizarionEntity } from "../../authorization/entities/authorization.entity";

export interface IUserEntity {
    readonly id: number;
    readonly roleId: number;
    readonly name: string;
    readonly email: string;
    readonly authorizations: IAuthorizarionEntity[];
    readonly authorizationsByFeatureName: Dictionary<IAuthorizarionEntity>;
    readonly allowedFeatures: IAuthorizarionEntity["featureName"][];
}

export default function User(
    userData: IUser,
    authorizations: IAuthorizarionEntity[]
): IUserEntity {
    const user: IUserEntity = {
        get id() {
            return userData.id;
        },
        get roleId() {
            return userData.roleId;
        },
        get name() {
            return userData.name;
        },
        get email() {
            return userData.email;
        },
        get authorizations() {
            return authorizations;
        },
        get authorizationsByFeatureName() {
            return keyBy(this.authorizations, "featureName");
        },
        get allowedFeatures() {
            return this.authorizations.map(
                (authorization) => authorization.featureName
            );
        },
    };

    Object.freeze(user);

    return user;
}
