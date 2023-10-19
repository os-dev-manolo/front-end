import { IEnv } from "../../../shared/interfaces/IEnv";

export default {
    client: {
        name: "tibagi",
        nomePrefeitura: "Prefeitura Municipal de Tibagi",
        logo: "https://d1cge5fflrvk0g.cloudfront.net/TIBAGI/logos/logo_2.png",
        brasao: "https://d1cge5fflrvk0g.cloudfront.net/TIBAGI/logos/brasao.png",
        municipio: "| TIBAGI - PR",
    },
    webgeo: {
        coordinatesPattern: "EPSG:32722",
        bci: {
            nomeSecretaria: "Secretaria Municipal de Gestão Pública e Finanças",
        },
        confrontante: {
            informacoesRodape:
                "Praça Edmundo Mercer, nº 34, Centro - CEP 84.300.000 - Tibagi-PR  Telefone: (42) 3916-2200 Email: comunicacao@tibagi.pr.gov.br",
            nomeSecretaria:
                "Secretaria Municipal de Desenvolvimento Urbano e Logística",
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
            confrontante: true,
            consultaPrevia: false,
            iptu: false,
            laws: false,
        },
        map: {
            center: [-50.409354, -24.51538],
            zoom: 19,
        },
    },
    api: {
        url: "https://api-prd.semv.com.br/tibagi/",
    },
    geoserver: {
        url: "https://geoserver.semv.com.br/geoserver",
    },
} as IEnv;
