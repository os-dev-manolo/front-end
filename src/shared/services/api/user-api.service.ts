import { semvApi } from "../axios/apis.service";

import {
    IRegisterResponse,
    ISigninRequest,
    ISigninResponse,
} from "../../interfaces/IAuth";
import {
    IRegisterRequest,
    IResetPassword,
    IUser,
} from "../../interfaces/IUser";
import { IPaginateApiResponse } from "../../interfaces/IPaginate";

export const UserService = {
    async signin(payload: ISigninRequest): Promise<ISigninResponse> {
        const { data } = await semvApi.post("/auth", payload);

        return data;
    },
    async register(payload: IRegisterRequest): Promise<IRegisterResponse> {
        const { data: response } = await semvApi.post("/users", {
            usu_cpfcnpj: payload.document,
            usu_email: payload.email,
            role_id: payload.role,
            usu_nome: payload.name,
            usu_senha: payload.password,
            usu_telefone: payload.telephone,
            system: payload.system,
        });

        return response;
    },
    async updatePassword(payload: IResetPassword): Promise<void> {
        await semvApi.patch("/users/password", payload);
    },
    async activeUser(code: string, userId: number): Promise<void> {
        await semvApi.patch("/webgeo/auth", {
            code,
            userId,
        });
    },
    async resetPassword(email: string): Promise<ISigninResponse> {
        const { data: message } = await semvApi.post("/users/password/reset", {
            email,
        });

        return message;
    },
    async getUsers(
        searchParms?: string,
        relations?: string
    ): Promise<IPaginateApiResponse<IUser[]>> {
        const { data } = await semvApi.get<IPaginateApiResponse<IUser[]>>(
            relations
                ? `/users?${searchParms}${relations}`
                : `/users?${searchParms}`
        );

        return data;
    },
};
