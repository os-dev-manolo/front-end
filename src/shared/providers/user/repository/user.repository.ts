import SessionProvider from "../../session";
import UserDatasource from "../datasource/user.datasource";
import Authorizarion from "../../authorization/entities/authorization.entity";
import User, { IUserEntity } from "../entities/user.entity";
import IUserDatasource, {
    ISigninArgs,
    ISigninResponse,
    IRegisterArgs,
    IUpdatePasswordArgs,
} from "../interfaces/user.datasource.interface";
import IUserRepository from "../interfaces/user.repository.interface";

export class UserRepository implements IUserRepository {
    private readonly userDatasource: IUserDatasource;

    constructor(userDatasource: IUserDatasource = new UserDatasource()) {
        this.userDatasource = userDatasource;
    }

    async signinToGrp(args: Omit<ISigninArgs, "system">): Promise<IUserEntity> {
        const response = await this.userDatasource.signin({
            ...args,
            system: "gbp",
        });
        return UserRepository.generateUserEntity(response);
    }

    async signinToWebgeo(
        args: Omit<ISigninArgs, "system">
    ): Promise<IUserEntity> {
        const response = await this.userDatasource.signin({
            ...args,
            system: "webgeo",
        });
        return UserRepository.generateUserEntity(response);
    }

    async register(args: Omit<IRegisterArgs, "system">): Promise<boolean> {
        const response = await this.userDatasource.register({
            ...args,
            system: "webgeo",
        });
        return response;
    }

    async updatePassword(args: IUpdatePasswordArgs): Promise<boolean> {
        const response = await this.userDatasource.updatePassword(args);
        return response;
    }

    async activeUser(code: string, userId: number): Promise<boolean> {
        const response = await this.userDatasource.activeUser(code, userId);
        return response;
    }

    async resetPassword(email: string): Promise<boolean> {
        const response = await this.userDatasource.resetPassword(email);
        return response;
    }

    static generateUserEntity({ accesses, token, user }: ISigninResponse) {
        const authorizations = accesses.features.map((feature) =>
            Authorizarion(feature)
        );

        const userEntity = User(user, authorizations);

        SessionProvider.setToken(token);

        SessionProvider.setUser(userEntity);

        return userEntity;
    }
}

export default UserRepository;
