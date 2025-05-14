import { IRolesResponse } from "./IRoles";

export interface IRegisterRequest {
    email: string;
    name: string;
    document: string;
    telephone: string;
    password: string;
    passwordConfimartion?: string;
    role: string;
    system: "gbp" | "webgeo";
}

export interface IResetPassword {
    code?: string;
    newPassword: string;
    previousPassword?: string;
}

export interface IUser {
    id: number;
    usu_nome: string;
    usu_senha: string;
    role_id: number;
    usu_ativo: boolean;
    usu_email: string;
    usu_telefone: string;
    usu_cpfcnpj: string;
    usu_codigo_ativacao?: string;
    usu_codigo_resetsenha?: string;
    created_at: Date;
    updated_at: Date;
    role?: IRolesResponse;
}
