import { IEnv } from "../../../shared/interfaces/IEnv";

export default {
    client: {
        name: "palmeira",
        nomePrefeitura: "Prefeitura Municipal de Palmeira",
        logo: "https://d1cge5fflrvk0g.cloudfront.net/palmeira/logos/brasao.png",
        brasao: "https://d1cge5fflrvk0g.cloudfront.net/palmeira/logos/brasao.png",
        municipio: "| PALMEIRA - PR",
    },
    webgeo: {
        coordinatesPattern: "EPSG:32722",
        bci: {
            nomeSecretaria: "Secretaria Municipal de Gestão Pública e Finanças",
        },
        confrontante: {
            informacoesRodape:
                "Departamento de Arrecadação Imobiliária Rua Luiza Trombini Malucelli, 134 – Centro Cívico – Palmeira PR 42-3909-5088",
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
            confrontante: true,
            consultaPrevia: true,
            iptu: false,
            laws: false,
        },
        map: {
            center: [-49.994832, -25.424493],
            zoom: 18,
        },
    },
    api: {
        url: "http://localhost:3330",
    },
    geoserver: {
        url: "https://geoserversp.semv.com.br/geoserver",
    },
} as IEnv;
