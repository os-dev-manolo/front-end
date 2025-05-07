import { IAdress } from "./IAddress";

export type Person = {
    id: number;
    nome: string;
    nascimento: Date;
    sexo: string;
    email_pessoal: string;
    email_comercial: string;
    observacao: string;
    id_coligacao: number;
    id_filiacao: number;
    cpf: string;
    telefone_principal: string;
    telefone_secundario: string;
    estado: string;
    bairro: string;
    endereco: string;
    numero: string;
    cidade: string;
    complemento: string;
    newsletter: string;
    cep: string;
    cargo_publico: string;
    relacao_politica: string;
    criado_em: Date;
    atualizado_em: Date;
    address: IAdress;
};
