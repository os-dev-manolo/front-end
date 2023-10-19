import { IEnv } from "../../../shared/interfaces/IEnv";

export default {
    client: {
        name: "jgv",
        nomePrefeitura: "Prefeitura Municipal de Jaguariaíva",
        logo: "https://d1cge5fflrvk0g.cloudfront.net/jaguariaiva/logos/brasao.png",
        brasao: "https://d1cge5fflrvk0g.cloudfront.net/jaguariaiva/logos/brasao.png",
        municipio: "| JAGUARIAÍVA - PR",
    },
    webgeo: {
        coordinatesPattern: "EPSG:32722",
        bci: {
            nomeSecretaria: "Secretaria Municipal de Gestão Pública e Finanças",
        },
        confrontante: {
            informacoesRodape:
                "Praça Izabel Branco, 142 - Cidade Alta Telefone 43 35359470 Email: adm.infra@jaguariaiva.pr.gov.br",
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
            center: [-49.7060852, -24.2481922],
            zoom: 18,
        },
    },
    api: {
        url: "https://api-prd.semv.com.br/jgv/",
    },
    geoserver: {
        url: "https://geoserver.semv.com.br/geoserver",
    },
} as IEnv;
