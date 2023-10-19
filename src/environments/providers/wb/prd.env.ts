import { IEnv } from "../../../shared/interfaces/IEnv";

export default {
    client: {
        name: "wb",
        nomePrefeitura: "Prefeitura Municipal de Wenceslau Braz",
        logo: "https://d1cge5fflrvk0g.cloudfront.net/wb/logos/brasao.png",
        brasao: "https://d1cge5fflrvk0g.cloudfront.net/wb/logos/brasao.png",
    },
    webgeo: {
        coordinatesPattern: "EPSG:32722",
        bci: {
            nomeSecretaria: "Secretaria Municipal de Gestão Pública e Finanças",
        },
        confrontante: {
            informacoesRodape: "",
            nomeSecretaria: "Secretaria Municipal de Gestão Pública e Finanças",
        },
        consultaPrevia: {
            nomeSecretaria: "Secretaria Municipal de Urbanismo",
            contact: {
                email: "xxx",
                endereco: "xxx",
                horarioAtendimento: "xxx",
                telefone: "xxx",
            },
            leiUsoDeSolo:
                "PARÂMETROS DE USO DO SOLO - Anexo (X) - Lei no XXXX/XXXX",
            leiVagasDeEstacionamento:
                "VAGAS PARA ESTACIONAMENTO anexo à lei XXXX/XXXXX",
        },
        config: {
            bci: true,
            confrontante: false,
            consultaPrevia: false,
            iptu: false,
            laws: false,
        },
        map: {
            center: [-49.8041708, -23.8772403],
            zoom: 18,
        },
    },
    api: {
        url: "https://api-prd.semv.com.br/wb/",
    },
    geoserver: {
        url: "https://geoserver.semv.com.br/geoserver",
    },
} as IEnv;
