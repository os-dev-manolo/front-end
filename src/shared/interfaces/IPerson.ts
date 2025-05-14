import { IAdress } from "./IAddress";

export type Person = {
    id: number;
    nome: string;
    sobrenome: string;
    nascimento: Date;
    sexo: string;
    email_pessoal: string;
    email_comercial: string;
    observacao: string;
    id_coligacao: number;
    id_filiacao: number;
    cpf: string;
    telefone_principal: string;
    telefone_secundario: string;
    newsletter: string;
    cargo_publico: string;
    relacao_politica: string;
    criado_em: Date;
    atualizado_em: Date;
    address: IAdress;
    //Allan: a partir da linha 30 é cadastro completo
    // Adicionados como opcionais
    correspondencia: string;
    foto: string;

    // Telefones adicionais
    telefone_tipo: string;
    telefone_ddd: string;
    telefone_ramal: string;
    telefone_operadora: string;

    // Website
    website_tipo: string;
    website_link: string;

    // Endereço residencial
    residencial_cep: string;
    residencial_estado: string;
    residencial_cidade: string;
    residencial_endereco: string;
    residencial_bairro?: string;
    residencial_numero?: string;
    residencial_complemento?: string;
    residencial_microrregional?: string;
    residencial_regiao?: string;

    // Endereço comercial
    comercial_cep?: string;
    comercial_estado?: string;
    comercial_cidade?: string;
    comercial_endereco?: string;
    comercial_bairro?: string;
    comercial_numero?: string;
    comercial_complemento?: string;
    comercial_microrregional?: string;
    comercial_regiao?: string;

    // Complementar x político
    apelido?: string;
    base_politica?: string;
    candidato?: string;
    cargo?: string;
    classificacao?: string;
    contato?: string;
    coordenador?: string;
    corrente?: string;
    estado_civil?: string;
    formacao?: string;
    igreja?: string;
    indicado_por?: string;
    lideranca?: string;
    multiplicador?: string;
    numero_filhos?: number;
    orientacao_sexual?: string;
    partido?: string;
    profissao?: string;
    pronome_tratamento?: string;
    raca_cor?: string;
    religiao?: string;
    cargo_etiqueta?: string;
    presidente_partidario?: string;

    // Documentos
    rg?: string;
    zona?: string;
    secao?: string;
    titulo_eleitoral?: string;
    cartao_sus?: string;
    nome_mae?: string;
    nome_pai?: string;
};
