import { IAuthorization } from "../interfaces/authorizarion.interface";

export interface IAuthorizarionEntity {
    readonly featureName: IAuthorization["featureDetails"]["name"];
    readonly featureId: IAuthorization["featureDetails"]["id"];
    readonly featureAllowedRessources: IAuthorization["ressources"];
    readonly featureAllowedActions: IAuthorization["actions"];
    readonly canRead: boolean;
    readonly canWrite: boolean;
    readonly canUpdate: boolean;
    readonly canDelete: boolean;
}

export default function Authorizarion(
    data: IAuthorization
): IAuthorizarionEntity {
    const authorization: IAuthorizarionEntity = {
        get featureName() {
            return data.featureDetails.name;
        },
        get featureId() {
            return data.featureDetails.id;
        },
        get featureAllowedRessources() {
            return data.ressources;
        },
        get featureAllowedActions() {
            return data.actions;
        },
        get canRead() {
            return data.actions.includes("read") || data.actions === "*";
        },
        get canUpdate() {
            return data.actions.includes("update") || data.actions === "*";
        },
        get canWrite() {
            return data.actions.includes("write") || data.actions === "*";
        },
        get canDelete() {
            return data.actions.includes("delete") || data.actions === "*";
        },
    };

    Object.freeze(authorization);

    return authorization;
}
