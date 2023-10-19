import { IEnv } from "../../../shared/interfaces/IEnv";

export default {
    client: {
        name: "carambei",
        nomePrefeitura: "Prefeitura Municipal de Carambeí",
        logo: "https://d1cge5fflrvk0g.cloudfront.net/carambei/logos/brasao.png",
        brasao: "https://d1cge5fflrvk0g.cloudfront.net/carambei/logos/logo2.png",
        municipio: "| CARAMBEÍ - PR",
    },
    webgeo: {
        coordinatesPattern: "EPSG:32722",
        bci: {
            nomeSecretaria: "Secretaria Municipal de Gestão Pública e Finanças",
        },
        confrontante: {
            informacoesRodape:
                "Avenida do Ouro, 1355, Nova Carambeí - Carambeí/PR - CEP: 84145000 - Telefone: (42) 3231-8350 - Email: atendimentopmcarambei@gmail.com",
            nomeSecretaria:
                "Secretaria Municipal de Desenvolvimento Urbano e Logística",
        },
        consultaPrevia: {
            nomeSecretaria: "Secretaria Municipal de Urbanismo",
            contact: {
                email: "atendimentopmcarambei@gmail.com",
                endereco:
                    "Avenida do Ouro, 1355, Nova Carambeí  - Carambeí/PR CEP: 84145000",
                horarioAtendimento: "xxx",
                telefone: "(42) 3231-8350",
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
            center: [-50.1111819, -24.9531892],
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
