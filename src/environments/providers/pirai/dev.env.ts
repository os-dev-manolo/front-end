import { IEnv } from "../../../shared/interfaces/IEnv";

export default {
    client: {
        name: "pirai",
        nomePrefeitura: "Prefeitura Municipal de Pirai do Sul",
        logo: "https://d1cge5fflrvk0g.cloudfront.net/pirai_do_sul/logos/brasao.png",
        brasao: "https://d1cge5fflrvk0g.cloudfront.net/pirai_do_sul/logos/brasao.png",
    },
    webgeo: {
        coordinatesPattern: "EPSG:32722",
        bci: {
            nomeSecretaria: "Secretaria Municipal de Fazenda",
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
            center: [-49.9367391, -24.531472],
            zoom: 18,
        },
    },
    api: {
        url: "http://localhost:3330",
    },
    geoserver: {
        url: "https://geoserver.semv.com.br/geoserver",
    },
} as IEnv;
