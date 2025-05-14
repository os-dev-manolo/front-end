import { IEnvironment } from "../../../shared/interfaces/IEnvironments";

export default {
    client: {
        name: "partido b",
        nomePrefeitura: "PARTIDO B",
        logo: "",
        brasao: "",
        municipio: "| PARTIDO B",
    },
    webgeo: {
        coordinatesPattern: "EPSG:32722",
        bci: {
            nomeSecretaria: "",
        },
        confrontante: {
            informacoesRodape: "",
            nomeSecretaria: "",
        },
        consultaPrevia: {
            nomeSecretaria: "",
            contact: {
                email: "",
                endereco: "",
                horarioAtendimento: "",
                telefone: "",
            },
            leiUsoDeSolo: "",
            leiVagasDeEstacionamento: "",
        },
        config: {
            bci: false,
            confrontante: false,
            consultaPrevia: false,
            iptu: false,
            laws: false,
        },
        map: {
            center: [-51.7624829, -23.7093912],
            zoom: 18,
        },
    },
    api: {
        url: "",
    },
    geoserver: {
        url: "",
    },
} as IEnvironment;
