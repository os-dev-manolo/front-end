import { Person } from "./IPerson";

export type PoliticalChain = {
    id: number;
    nome: string;
    ano_criacao: string;
    criado_em: Date;
    atualizado_em: Date;
};

export type PoliticalParty = {
    id: number;
    nome: string;
    sigla: string;
    cor_principal: string;
    cor_secundaria: string;
    ano_criacao: string;
    criado_em: Date;
    atualizado_em: Date;
    id_coligação?: number;
    coligacao?: PoliticalChain;
};

export type Politic = {
    id: number;
    id_partido: number;
    id_pessoa_fisica: number;
    criado_em: Date;
    atualizado_em: Date;
    partido: PoliticalParty;
    pessoa: Person;
    cargo_politico: string;
};

export type Official = {
    id: number;
    nome: string;
    poder: string;
    nivel: string;
    tipo: string;
    observações: string;
};

export type City = {
    id: number;
    cidade: string;
    populacao: string;
    ultima_visita: string;
    prefeito: string;
    resumo: string;
    criado_em: Date;
    atualizado_em: Date;
};
