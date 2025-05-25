import { LegalPerson } from "../../../../shared/interfaces/ILegalPerson";
import { IGbpStandardPageConfig } from "../../../../shared/interfaces/IPageConfig";

export const Configpj: IGbpStandardPageConfig<LegalPerson> = {
    api: { path: "crud/pessoa-juridica" },
    fields: {
        // Identificação
        id: { label: "Código", fieldType: "number" },
        razao_social: { label: "Razão Social", fieldType: "text" },
        nome_fantasia: { label: "Nome Fantasia", fieldType: "text" },
        cnpj: { label: "CNPJ", fieldType: "text" },

        // Inscrição estadual e municipal
        inscricao_estadual: { label: "Inscrição Estadual", fieldType: "text" },
        inscricao_municipal: {
            label: "Inscrição Municipal",
            fieldType: "text",
        },

        // Dados de registro
        natureza_juridica: { label: "Natureza Jurídica", fieldType: "text" },
        porte_empresa: { label: "Porte da Empresa", fieldType: "text" },
        data_abertura: { label: "Data de Abertura", fieldType: "date" },
        atividade_principal: {
            label: "Atividade Principal",
            fieldType: "text",
        },
        atividades_secundarias: {
            label: "Atividades Secundárias",
            fieldType: "text",
        },
        capital_social: { label: "Capital Social", fieldType: "text" },

        // Contato
        email_comercial: { label: "Email Comercial", fieldType: "text" },
        telefone_principal: { label: "Telefone Principal", fieldType: "text" },
        telefone_secundario: {
            label: "Telefone Secundário",
            fieldType: "text",
        },
        telefone_tipo: { label: "Tipo de Telefone", fieldType: "text" },
        telefone_ddd: { label: "DDD", fieldType: "text" },
        telefone_ramal: { label: "Ramal", fieldType: "text" },
        telefone_operadora: { label: "Operadora", fieldType: "text" },
        website_tipo: { label: "Tipo de Website", fieldType: "text" },
        website_link: { label: "Website", fieldType: "text" },
        contato: { label: "Contato Político", fieldType: "text" },
        autoriza_newsletter: {
            label: "Autoriza Newsletter",
            fieldType: "text",
        },
        newsletter: { label: "Newsletter", fieldType: "text" },

        // Endereço Comercial (Principal)
        comercial_cep: { label: "CEP Comercial", fieldType: "text" },
        comercial_estado: { label: "Estado Comercial", fieldType: "text" },
        comercial_cidade: { label: "Cidade Comercial", fieldType: "text" },
        comercial_endereco: { label: "Endereço Comercial", fieldType: "text" },
        comercial_bairro: { label: "Bairro Comercial", fieldType: "text" },
        comercial_numero: { label: "Número Comercial", fieldType: "text" },
        comercial_complemento: {
            label: "Complemento Comercial",
            fieldType: "text",
        },
        comercial_microrregional: {
            label: "Microrregião Comercial",
            fieldType: "text",
        },
        comercial_regiao: { label: "Região Comercial", fieldType: "text" },

        // Endereço Residencial (Secundário)
        correspondencia: { label: "Correspondência", fieldType: "text" },
        residencial_cep: { label: "CEP Residencial", fieldType: "text" },
        residencial_estado: { label: "Estado Residencial", fieldType: "text" },
        residencial_cidade: { label: "Cidade Residencial", fieldType: "text" },
        residencial_endereco: {
            label: "Endereço Residencial",
            fieldType: "text",
        },
        residencial_bairro: { label: "Bairro Residencial", fieldType: "text" },
        residencial_numero: { label: "Número Residencial", fieldType: "text" },
        residencial_complemento: {
            label: "Complemento Residencial",
            fieldType: "text",
        },
        residencial_microrregional: {
            label: "Microrregião Residencial",
            fieldType: "text",
        },
        residencial_regiao: { label: "Região Residencial", fieldType: "text" },

        // Informações Políticas/Relacionamentos
        apelido: { label: "Apelido", fieldType: "text" },
        base_politica: { label: "Base Política", fieldType: "text" },
        cargo_publico: { label: "Cargo Público", fieldType: "text" },
        coordenador: { label: "Coordenador", fieldType: "text" },
        corrente: { label: "Corrente", fieldType: "text" },
        indicado_por: { label: "Indicado Por", fieldType: "text" },
        lideranca: { label: "Liderança", fieldType: "text" },
        multiplicador: { label: "Multiplicador", fieldType: "text" },
        partido: { label: "Partido", fieldType: "text" },
        presidente_partidario: {
            label: "Presidente Partidário",
            fieldType: "text",
        },
        cargo_etiqueta: { label: "Cargo Etiqueta", fieldType: "text" },

        // Perfil Institucional
        igreja: { label: "Igreja", fieldType: "text" },
        religiao: { label: "Religião", fieldType: "text" },
        raca_cor: { label: "Raça/Cor", fieldType: "text" },
        pronome_tratamento: {
            label: "Pronome de Tratamento",
            fieldType: "text",
        },
        formacao: { label: "Formação", fieldType: "text" },
        profissao: { label: "Profissão", fieldType: "text" },

        // Multimídia / Observações
        foto: { label: "Foto", fieldType: "text" },
        observacao: { label: "Observações", fieldType: "text" },
    },
};
