export type LegalPerson = {
    id: number; // Reflete o campo 'id' da tabela SQL
    razao_social: string; // 'razao_social' em SQL
    nome_fantasia: string; // 'nome_fantasia' em SQL
    cnpj: string; // 'cnpj' em SQL
    inscricao_estadual?: string; // 'inscricao_estadual' em SQL (opcional no tipo)
    inscricao_municipal?: string; // 'inscricao_municipal' em SQL (opcional)
    natureza_juridica?: string; // 'natureza_juridica' em SQL (opcional)
    porte_empresa?: string; // 'porte_empresa' em SQL (opcional)
    data_abertura?: Date; // 'data_abertura' em SQL (opcional)
    atividade_principal?: string; // 'atividade_principal' em SQL (opcional)
    atividades_secundarias?: string; // 'atividades_secundarias' em SQL (opcional)
    capital_social?: number; // 'capital_social' em SQL (opcional)

    // Contato
    email_comercial: string; // 'email_comercial' em SQL (não pode ser nulo)
    telefone_principal: string; // 'telefone_principal' em SQL (não pode ser nulo)
    telefone_secundario?: string; // 'telefone_secundario' em SQL (opcional)
    telefone_tipo?: string; // 'telefone_tipo' em SQL (opcional)
    telefone_ddd?: string; // 'telefone_ddd' em SQL (opcional)
    telefone_ramal?: string; // 'telefone_ramal' em SQL (opcional)
    telefone_operadora?: string; // 'telefone_operadora' em SQL (opcional)
    website_tipo?: string; // 'website_tipo' em SQL (opcional)
    website_link: string; // 'website_link' em SQL (não pode ser nulo)
    contato?: string; // 'contato' em SQL (opcional)
    autoriza_newsletter?: boolean; // 'autoriza_newsletter' em SQL (opcional)
    newsletter?: string; // 'newsletter' em SQL (opcional)

    // Endereço comercial (principal)
    comercial_cep: string; // 'comercial_cep' em SQL (não pode ser nulo)
    comercial_estado: string; // 'comercial_estado' em SQL (não pode ser nulo)
    comercial_cidade: string; // 'comercial_cidade' em SQL (não pode ser nulo)
    comercial_endereco: string; // 'comercial_endereco' em SQL (não pode ser nulo)
    comercial_bairro: string; // 'comercial_bairro' em SQL (não pode ser nulo)
    comercial_numero: string; // 'comercial_numero' em SQL (não pode ser nulo)
    comercial_complemento?: string; // 'comercial_complemento' em SQL (opcional)

    comercial_microrregional?: string; // 'comercial_microrregional' em SQL (opcional)
    comercial_regiao?: string; // 'comercial_regiao' em SQL (opcional)

    // Endereço secundário / correspondência
    correspondencia?: string; // 'correspondencia' em SQL (opcional)
    residencial_cep?: string; // 'residencial_cep' em SQL (opcional)
    residencial_estado?: string; // 'residencial_estado' em SQL (opcional)
    residencial_cidade?: string; // 'residencial_cidade' em SQL (opcional)
    residencial_endereco?: string; // 'residencial_endereco' em SQL (opcional)
    residencial_bairro?: string; // 'residencial_bairro' em SQL (opcional)
    residencial_numero?: string; // 'residencial_numero' em SQL (opcional)
    residencial_complemento?: string; // 'residencial_complemento' em SQL (opcional)
    residencial_microrregional?: string; // 'residencial_microrregional' em SQL (opcional)
    residencial_regiao?: string; // 'residencial_regiao' em SQL (opcional)

    // Informações políticas / relacionamentos
    id_coligacao?: number; // 'id_coligacao' em SQL (opcional)
    id_filiacao?: number; // 'id_filiacao' em SQL (opcional)
    cargo_publico?: string; // 'cargo_publico' em SQL (opcional)
    relacao_politica?: string; // 'relacao_politica' em SQL (opcional)
    cargo?: string; // 'cargo' em SQL (opcional)
    cargo_etiqueta?: string; // 'cargo_etiqueta' em SQL (opcional)
    partido?: string; // 'partido' em SQL (opcional)
    coordenador?: string; // 'coordenador' em SQL (opcional)
    presidente_partidario?: string; // 'presidente_partidario' em SQL (opcional)
    base_politica?: string; // 'base_politica' em SQL (opcional)
    classificado_como?: string; // 'classificado_como' em SQL (opcional)
    corrente?: string; // 'corrente' em SQL (opcional)
    indicado_por?: string; // 'indicado_por' em SQL (opcional)
    lideranca?: string; // 'lideranca' em SQL (opcional)
    multiplicador?: string; // 'multiplicador' em SQL (opcional)
    apelido?: string; // 'apelido' em SQL (opcional)

    // Características e perfil institucional
    igreja?: string; // 'igreja' em SQL (opcional)
    religiao?: string; // 'religiao' em SQL (opcional)
    raca_cor?: string; // 'raca_cor' em SQL (opcional)
    pronome_tratamento?: string; // 'pronome_tratamento' em SQL (opcional)
    formacao?: string; // 'formacao' em SQL (opcional)
    profissao?: string; // 'profissao' em SQL (opcional)

    // Multimídia / observações
    foto?: string; // 'foto' em SQL (opcional)
    observacao: string; // 'observacao' em SQL (não pode ser nulo)
};
