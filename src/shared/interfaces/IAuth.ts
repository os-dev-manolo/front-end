import { IAllowedFeatures } from "./IFeatures";

export interface ISigninRequest {
    email: string;
    password: string;
    system: "gbp";
}

export interface ISigninResponse {
    token: string;
    user: {
        id: number;
        roleId: number;
        name: string;
        email: string;
    };
    accesses: {
        features: IAllowedFeatures[];
    };
}

export interface IUserSession extends ISigninResponse {
    user: ISigninResponse["user"] & {
        canEditWebgeo: boolean;
        grpAccess: boolean;
    };
}
export interface IRegisterResponse {
    response: string;
}
