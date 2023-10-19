export default interface IPropertyHistory {
    id: number;
    li_id: number;
    li_observacao: string;
    li_anexos: string[];
    inscricao: string;
    lote_id?: number;
    tbimv_id?: number;
    user?: { usu_nome: string };
    li_related_by: "geomSubscription" | "subscription";
    updated_at: Date;
}
