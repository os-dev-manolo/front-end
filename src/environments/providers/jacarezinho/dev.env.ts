import { IEnv } from "../../../shared/interfaces/IEnv";

export default {
    client: {
        name: "jcz",
        nomePrefeitura: "Prefeitura Municipal de Jacarezinho",
        logo: "https://d1cge5fflrvk0g.cloudfront.net/jacarezinho/logos/logo.png",
        brasao: "https://d1cge5fflrvk0g.cloudfront.net/jacarezinho/logos/brasao.png",
        municipio: "| JACAREZINHO - PR",
    },
    webgeo: {
        coordinatesPattern: "EPSG:32722",
        bci: {
            nomeSecretaria: "Secretaria Municipal de Gestão Pública e Finanças",
        },
        confrontante: {
            informacoesRodape:
                "Rua Cel. Batista, 335 - Centro" +
                "\n" +
                "Telefone 43 3911-3004 e 43 3911-3008" +
                "\n" +
                "Email: arrecadacao@jacarezinho.pr.gov.br",
            nomeSecretaria: "Secretaria Municipal de Finanças",
        },
        consultaPrevia: {
            nomeSecretaria: "Secretaria Municipal de Urbanismo",
            contact: {
                email: "urbano@jacarezinho.pr.gov.br",
                endereco:
                    "R. Cel. Batista, 335 - CENTRO, Jacarezinho - PR, 86400-000",
                horarioAtendimento: "(das 8:00 às 11:30) ",
                telefone: "(43) 3911-3006 ",
            },
            leiUsoDeSolo:
                "PARÂMETROS DE USO DO SOLO - Anexo (III - IV - V - VI - VII - VIII- IX) ",
            leiVagasDeEstacionamento:
                "ANEXO VIII - TABELA DE VAGAS PARA ESTACIONAMENTO",
        },
        config: {
            bci: true,
            confrontante: true,
            consultaPrevia: true,
            iptu: false,
            laws: false,
        },
        map: {
            center: [-49.9732858, -23.1595466],
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
