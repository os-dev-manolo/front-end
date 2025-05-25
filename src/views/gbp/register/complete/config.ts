import { IGbpStandardPageConfig } from "../../../../shared/interfaces/IPageConfig";
import { Person } from "../../../../shared/interfaces/IPerson";

export const Config: IGbpStandardPageConfig<Person> = {
    api: { path: "crud/pessoa-fisica" },
    fields: {
        id: { label: "Código", fieldType: "number" },
        nome: { label: "Nome completo", fieldType: "text" },
        nascimento: { label: "Nascimento", fieldType: "date" },
        sexo: { label: "Gênero", fieldType: "text" },
        correspondencia: { label: "Correspondência", fieldType: "text" },
        foto: { label: "Foto (URL ou base64)", fieldType: "text" },

        // Telefones
        telefone_tipo: { label: "Tipo", fieldType: "text" },
        telefone_ddd: { label: "DDD", fieldType: "text" },
        telefone_principal: { label: "Telefone principal", fieldType: "text" },
        telefone_secundario: {
            label: "Telefone secundário",
            fieldType: "text",
        },
        telefone_ramal: { label: "Ramal", fieldType: "text" },
        telefone_operadora: { label: "Operadora", fieldType: "text" },

        // Contato digital
        email_pessoal: { label: "Email pessoal", fieldType: "text" },
        email_comercial: { label: "Email comercial", fieldType: "text" },
        website_tipo: { label: "Tipo de website", fieldType: "text" },
        website_link: { label: "Website", fieldType: "text" },

        // Endereço residencial
        residencial_endereco: {
            label: "Endereço residencial",
            fieldType: "text",
        },
        residencial_cep: { label: "CEP residencial", fieldType: "text" },
        residencial_estado: { label: "Estado", fieldType: "text" },
        residencial_cidade: { label: "Cidade", fieldType: "text" },
        residencial_bairro: { label: "Bairro", fieldType: "text" },
        residencial_numero: { label: "Número", fieldType: "text" },
        residencial_complemento: { label: "Complemento", fieldType: "text" },
        residencial_microrregional: {
            label: "Microrregião",
            fieldType: "text",
        },
        residencial_regiao: { label: "Região", fieldType: "text" },

        // Endereço comercial
        comercial_endereco: { label: "Endereço comercial", fieldType: "text" },
        comercial_cep: { label: "CEP comercial", fieldType: "text" },
        comercial_estado: { label: "Estado", fieldType: "text" },
        comercial_cidade: { label: "Cidade", fieldType: "text" },
        comercial_bairro: { label: "Bairro", fieldType: "text" },
        comercial_numero: { label: "Número", fieldType: "text" },
        comercial_complemento: { label: "Complemento", fieldType: "text" },
        comercial_microrregional: { label: "Microrregião", fieldType: "text" },
        comercial_regiao: { label: "Região", fieldType: "text" },

        // Complementar/político
        apelido: { label: "Apelido", fieldType: "text" },
        base_politica: { label: "Base política", fieldType: "text" },
        candidato: { label: "É candidato(a)?", fieldType: "text" },
        cargo_publico: { label: "Cargo público", fieldType: "text" },
        classificacao: { label: "Classificação", fieldType: "text" },
        contato: { label: "Contato", fieldType: "text" },
        coordenador: { label: "Coordenador", fieldType: "text" },
        corrente: { label: "Corrente", fieldType: "text" },
        estado_civil: { label: "Estado civil", fieldType: "text" },
        formacao: { label: "Formação", fieldType: "text" },
        igreja: { label: "Igreja", fieldType: "text" },
        indicado_por: { label: "Indicado por", fieldType: "text" },
        lideranca: { label: "Liderança", fieldType: "text" },
        multiplicador: { label: "Multiplicador", fieldType: "text" },
        numero_filhos: { label: "Número de filhos", fieldType: "number" },
        orientacao_sexual: { label: "Orientação sexual", fieldType: "text" },
        partido: { label: "Partido", fieldType: "text" },
        profissao: { label: "Profissão", fieldType: "text" },
        pronome_tratamento: {
            label: "Pronome de tratamento",
            fieldType: "text",
        },
        raca_cor: { label: "Raça/Cor", fieldType: "text" },
        religiao: { label: "Religião", fieldType: "text" },
        cargo_etiqueta: { label: "Cargo etiqueta", fieldType: "text" },
        presidente_partidario: {
            label: "Presidente partidário",
            fieldType: "text",
        },
        newsletter: { label: "Autoriza newsletter", fieldType: "text" },

        // Documentos
        rg: { label: "RG", fieldType: "text" },
        cpf: { label: "CPF", fieldType: "text" },
        zona: { label: "Zona eleitoral", fieldType: "text" },
        secao: { label: "Seção eleitoral", fieldType: "text" },
        titulo_eleitoral: { label: "Título de eleitor", fieldType: "text" },
        cartao_sus: { label: "Cartão SUS", fieldType: "text" },
        nome_mae: { label: "Nome da mãe", fieldType: "text" },
        nome_pai: { label: "Nome do pai", fieldType: "text" },

        // Filtros e arrays finais
    },
};
