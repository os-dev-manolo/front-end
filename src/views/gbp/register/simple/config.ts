import { IGbpStandardPageConfig } from "../../../../shared/interfaces/IPageConfig";
import { Person } from "../../../../shared/interfaces/IPerson";

export const Config: IGbpStandardPageConfig<Person> = {
    api: { path: "crud/pessoa-fisica" },
    fields: {
        id: { label: "Código", fieldType: "number" },
        nome: { label: "Nome completo", fieldType: "text" },
        email_comercial: { label: "Email comercial", fieldType: "text" },
        email_pessoal: { label: "Email pessoal", fieldType: "text" },
        nascimento: { label: "Nascimento", fieldType: "date" },
        observacao: { label: "Observação", fieldType: "text" },
        bairro: { label: "Bairro", fieldType: "text" },
        cep: { label: "Cep", fieldType: "text" },
        complemento: { label: "Complemento", fieldType: "text" },
        cidade: { label: "Cidade", fieldType: "text" },
        numero: { label: "Número", fieldType: "text" },
        sexo: { label: "Gênero", fieldType: "text" },
        newsletter: { label: "Newsletter", fieldType: "text" },
        id_coligacao: { label: "Coligação", fieldType: "number" },
        id_filiacao: { label: "Filiação", fieldType: "number" },
        criado_em: { label: "Criado em", fieldType: "date" },
        atualizado_em: { label: "Atualizado em", fieldType: "date" },
        cpf: { label: "CPF", fieldType: "text" },
        endereco: { label: "Endereço", fieldType: "text" },
        estado: { label: "Estado", fieldType: "text" },
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
        address: {
            label: "Address",
            fieldType: "relation",
            fields: [
                {
                    label: "cep",
                    fieldType: "text",
                    key: "cep",
                },
                {
                    label: "estado",
                    fieldType: "text",
                    key: "estado",
                },
            ],
        },
    },
};
