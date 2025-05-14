import { Person } from "./IPerson";

export interface IAdress {
    id: number;
    cep: string;
    estado: string;
    rua: string;
    numero: string;
    complemento?: string;
    regiao: string;
    person: Person;
}
