import { LegalPerson } from "../../../../shared/interfaces/ILegalPerson";
import { IGbpStandardPageConfig } from "../../../../shared/interfaces/IPageConfig";

export const Configpj: IGbpStandardPageConfig<Partial<LegalPerson>> = {
    api: { path: "crud/pessoa-juridica" },
    fields: {
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

        id: { label: "Código", fieldType: "number" },
        nome_fantasia: { label: "Nome fantasia", fieldType: "text" },
        razao_social: { label: "Razao Social", fieldType: "text" },
        email_comercial: { label: "Email comercial", fieldType: "text" },
        observacao: { label: "Observação", fieldType: "text" },
        newsletter: { label: "Newsletter", fieldType: "text" },
        id_coligacao: { label: "Coligação", fieldType: "number" },
        id_filiacao: { label: "Filiação", fieldType: "number" },
        cnpj: { label: "CNPJ", fieldType: "text" },
        telefone_principal: { label: "Telefone principal", fieldType: "text" },
        telefone_secundario: {
            label: "Telefone secundário",
            fieldType: "text",
        },
        relacao_politica: {
            label: "Relação com a política",
            fieldType: "text",
        },
        cargo_publico: { label: "Possui cargo público", fieldType: "text" },
    },
};
