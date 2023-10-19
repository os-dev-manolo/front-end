import { IEnv } from "../../../shared/interfaces/IEnv";

export default {
    client: {
        name: "bomsucesso",
        nomePrefeitura: "Prefeitura Municipal de Bom Sucesso",
        logo: "https://d1cge5fflrvk0g.cloudfront.net/bom_sucesso/logos/logo1.png",
        brasao: "https://d1cge5fflrvk0g.cloudfront.net/bom_sucesso/logos/logo1.png",
        municipio: "| BOM SUCESSO - PR",
    },
    webgeo: {
        coordinatesPattern: "EPSG:32722",
        bci: {
            nomeSecretaria: "Secretaria Municipal de Gestão Pública e Finanças",
        },
        confrontante: {
            informacoesRodape:
                "Praça Paraná, 77 - Telefone (43)3442-2367 | (43)3442-2336 Email: administrativo@bomsucesso.pr.gov.br",
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
            center: [-51.7624829, -23.7093912],
            zoom: 18,
        },
    },
    api: {
        url: "https://api-prd.semv.com.br/bomsucesso/",
    },
    geoserver: {
        url: "https://geoserversp.semv.com.br/geoserver",
    },
} as IEnv;
