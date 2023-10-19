import { Position } from "geojson";

export interface IEnv {
    client: {
        name: string;
        nomePrefeitura: string;
        logo: string;
        brasao?: string;
        municipio?: string;
    };
    webgeo: {
        coordinatesPattern: string;
        map: {
            center: Position;
            zoom: number;
        };
        config: {
            bci: boolean;
            iptu: boolean;
            laws: boolean;
            confrontante: boolean;
            consultaPrevia: boolean;
        };
        bci: {
            nomeSecretaria: string;
        };
        consultaPrevia?: {
            nomeSecretaria: string;
            leiUsoDeSolo: string;
            leiVagasDeEstacionamento: string;
            contact: {
                horarioAtendimento: string;
                telefone: string;
                email: string;
                endereco: string;
            };
        };
        confrontante?: {
            nomeSecretaria: string;
            informacoesRodape: string;
            contact: {
                horarioAtendimento: string;
                telefone: string;
                email: string;
                endereco: string;
            };
        };
    };
    grp: {
        allowedMenus?: string[] | "*";
    };
    geoserver: {
        url: string;
    };
    api: {
        url: string;
    };
}
