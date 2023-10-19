import { AxiosInstance } from "axios";

import { semvApi } from "../../../services/axios/apis.service";
import IUserDatasource, {
    IRegisterArgs,
    ISigninArgs,
    IUpdatePasswordArgs,
    ISigninResponse,
} from "../interfaces/user.datasource.interface";

export class UserDatasource implements IUserDatasource {
    private readonly api: AxiosInstance;

    constructor(api: AxiosInstance = semvApi) {
        this.api = api;
    }

    async signin(args: ISigninArgs): Promise<ISigninResponse> {
        console.log(args);
        const { data } = await this.api.post<ISigninResponse>("/auth", args);

        return data;
    }

    async register(payload: IRegisterArgs): Promise<boolean> {
        try {
            await this.api.post("/users", {
                usu_cpfcnpj: payload.document,
                usu_email: payload.email,
                role_id: payload.role,
                usu_nome: payload.name,
                usu_senha: payload.password,
                usu_telefone: payload.telephone,
                system: payload.system,
            });

            return true;
        } catch {
            return false;
        }
    }

    async updatePassword(payload: IUpdatePasswordArgs): Promise<boolean> {
        try {
            await this.api.patch("/users/password", payload);

            return true;
        } catch {
            return false;
        }
    }

    async activeUser(code: string, userId: number): Promise<boolean> {
        try {
            await this.api.patch("/auth", {
                code,
                userId,
            });

            return true;
        } catch {
            return false;
        }
    }

    async resetPassword(email: string): Promise<boolean> {
        try {
            await this.api.post("/users/password/reset", {
                email,
            });

            return true;
        } catch {
            return false;
        }
    }
}

export default UserDatasource;
