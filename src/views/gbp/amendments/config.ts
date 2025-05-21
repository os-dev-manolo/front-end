import { IAmendmentsResponse } from "../../../shared/interfaces/IAmendments";
import { IGbpStandardPageConfig } from "../../../shared/interfaces/IPageConfig";

export const Config: IGbpStandardPageConfig<IAmendmentsResponse> = {
    api: { path: "crud/emendas" },
    fields: {
        id: { label: "Código", fieldType: "number" },
        proponente: { label: "proponente", fieldType: "text" },
        cnpj: { label: "cnpj", fieldType: "text" },
        contato: { label: "contato", fieldType: "text" },
        emenda: { label: "emenda", fieldType: "text" },
        numero_emenda: { label: "numero_emenda", fieldType: "text" },
        ano_emenda: { label: "ano_emenda", fieldType: "text" },
        situacao: { label: "situacao", fieldType: "text" },
        tipo: { label: "tipo", fieldType: "text" },
        indicacao: { label: "indicacao", fieldType: "text" },
        criado_em: { label: "Criado em", fieldType: "date" },
        atualizado_em: { label: "Atualizado em", fieldType: "date" },
        valor_estimado: { label: "Valor Estimado", fieldType: "number" },
    },
};
