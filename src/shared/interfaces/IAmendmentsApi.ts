export interface IAmendmentsApiResponse {
    id: number;
    codigo_emenda: string;
    ano: number;
    tipo_emenda: string;
    autor: string;
    nome_autor: string;
    numero_emenda: string;
    localidade_do_gasto: string;
    funcao: string;
    subfuncao: string;
    valor_empenhado: string;
    valor_liquidado: string;
    valor_pago: string;
    valor_resto_inscrito: string;
    valor_resto_cancelado: string;
    valor_resto_pago: string;
    criado_em: Date;
    atualizado_em: Date;
    programa: string;
    acao: string;
    plano: string;
}
