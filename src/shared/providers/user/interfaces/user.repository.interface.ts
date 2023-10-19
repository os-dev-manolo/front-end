import { IUserEntity } from "../entities/user.entity";
import {
    IRegisterArgs,
    ISigninArgs,
    IUpdatePasswordArgs,
} from "./user.datasource.interface";

export default interface IUserRepository {
    signinToWebgeo(args: Omit<ISigninArgs, "system">): Promise<IUserEntity>;

    signinToGrp(args: Omit<ISigninArgs, "system">): Promise<IUserEntity>;

    register(args: Omit<IRegisterArgs, "system">): Promise<boolean>;

    updatePassword(args: IUpdatePasswordArgs): Promise<boolean>;

    activeUser(code: string, userId: number): Promise<boolean>;

    resetPassword(email: string): Promise<boolean>;
}
