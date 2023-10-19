import { IEnv } from "../../../shared/interfaces/IEnv";

export default {
    client: {
        name: "ortigueira",
        nomePrefeitura: "Prefeitura municipal de Ortigueira",
        logo: "caminho da logo",
    },
    webgeo: {
        bci: {
            nomeSecretaria: "Secretaria municipal de ...",
        },
        config: {
            bci: true,
            confrontante: true,
            consultaPrevia: true,
            iptu: true,
            laws: false,
        },
        map: {
            center: [-49.994832, -25.424493],
            zoom: 18,
        },
    },
    api: {
        url: "https://api.semv.com.br/",
    },
    geoserver: {
        url: "https://geoserversp.semv.com.br/geoserver",
    },
} as IEnv;
