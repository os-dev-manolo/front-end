import { IEnv } from "../../../shared/interfaces/IEnv";

export default {
    client: {
        name: "castro",
        nomePrefeitura: "Prefeitura municipal de Castro",
        logo: "castro.png",
    },
    webgeo: {
        coordinatesPattern: "EPSG:32722",
        bci: {
            nomeSecretaria: "Secretaria Municipal de Urbanismo",
        },
        config: {
            bci: true,
            confrontante: true,
            consultaPrevia: true,
            iptu: true,
            laws: false,
        },
        map: {
            center: [-50.005921, -24.7846529],
            zoom: 18,
        },
        consultaPrevia: {
            nomeSecretaria: "Secretaria Municipal de Urbanismo",
            leiUsoDeSolo: "Anexo I - Lei no 2.160/2010",
            contact: {
                endereco: "Praça Pedro Kaled, 22 - Centro - Castro/PR.",
                telefone: "(42) 2122-5026",
                email: "atendimentopmcastro@gmail.com",
            },
        },
    },
    api: {
        url: "https://api.semv.com.br/",
    },
    geoserver: {
        url: "https://geoserversp.semv.com.br/geoserver",
    },
} as IEnv;
