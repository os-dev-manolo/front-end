import { IUserAuthorization } from "./authorization.interface";
import { IUser } from "./user.interface";

export default interface IUserDatasource {
    signin(args: ISigninArgs): Promise<ISigninResponse>;

    register(args: IRegisterArgs): Promise<boolean>;

    updatePassword(args: IUpdatePasswordArgs): Promise<boolean>;

    activeUser(code: string, userId: number): Promise<boolean>;

    resetPassword(email: string): Promise<boolean>;
}

export type ISystem = "gbp" | "webgeo";

export interface ISigninResponse {
    token: string;
    user: IUser;
    accesses: IUserAuthorization;
}

export interface ISigninArgs {
    email: string;
    password: string;
    system: ISystem;
}

export interface IRegisterArgs {
    email: string;
    name: string;
    document: string;
    telephone: string;
    password: string;
    role: string;
    system: ISystem;
}

export interface IUpdatePasswordArgs {
    newPassword: string;
    code?: string;
    previousPassword?: string;
}
