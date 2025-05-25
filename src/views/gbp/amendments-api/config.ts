import { IAmendmentsApiResponse } from "../../../shared/interfaces/IAmendmentsApi";
import { IGbpStandardPageConfig } from "../../../shared/interfaces/IPageConfig";

export const Config: IGbpStandardPageConfig<IAmendmentsApiResponse> = {
    api: { path: "crud/emendas-api" },
    fields: {
        id: { label: "Código", fieldType: "number" },
        codigo_emenda: { label: "codigo_emenda", fieldType: "text" },
        ano: { label: "ano", fieldType: "number" },
        tipo_emenda: { label: "tipo_emenda", fieldType: "text" },
        autor: { label: "autor", fieldType: "text" },
        nome_autor: { label: "nome_autor", fieldType: "text" },
        numero_emenda: { label: "numero_emenda", fieldType: "text" },
        localidade_do_gasto: {
            label: "localidade_do_gasto",
            fieldType: "text",
        },
        funcao: { label: "funcao", fieldType: "text" },
        subfuncao: { label: "subfuncao", fieldType: "text" },
        valor_empenhado: { label: "valor_empenhado em", fieldType: "text" },
        valor_liquidado: { label: "valor_liquidado", fieldType: "text" },
        valor_pago: { label: "valor_pago", fieldType: "text" },
        valor_resto_inscrito: {
            label: "valor_resto_inscrito",
            fieldType: "text",
        },
        valor_resto_cancelado: {
            label: "valor_resto_cancelado",
            fieldType: "text",
        },
        valor_resto_pago: {
            label: "valor_resto_pago",
            fieldType: "text",
        },
        criado_em: { label: "criado_em em", fieldType: "date" },
        atualizado_em: { label: "Atualizado em", fieldType: "date" },
        programa: { label: "programa", fieldType: "text" },
        acao: { label: "acao", fieldType: "text" },
        plano: { label: "plano", fieldType: "text" },
    },
};
