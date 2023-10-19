import { IEnv } from "../../../shared/interfaces/IEnv";

export default {
    client: {
        name: "imbau",
        nomePrefeitura: "Prefeitura Municipal de Imbau",
        logo: "https://d1cge5fflrvk0g.cloudfront.net/imbau/logos/brasao.png",
        brasao: "https://d1cge5fflrvk0g.cloudfront.net/imbau/logos/brasao.png",
    },
    webgeo: {
        coordinatesPattern: "EPSG:32722",
        bci: {
            nomeSecretaria: "Secretaria Municipal de Gestão Pública e Finanças",
        },
        confrontante: {
            informacoesRodape:
                "Departamento de Arrecadação Imobiliária Rua Luiza Trombini Malucelli, 134 – Centro Cívico – Palmeira PR42-3909-5088",
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
            center: [-50.7612368, -24.4466463],
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
