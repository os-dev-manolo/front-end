import IPropertyHistory from "../interfaces/property-history.interface";

export interface IPropertyHistoryEntity {
    readonly modifiedBy: string | undefined;
    readonly files: IPropertyHistory["li_anexos"];
    readonly observation: IPropertyHistory["li_observacao"];
    readonly subscription: IPropertyHistory["inscricao"];
    readonly realetedBy: "geom" | "subscription";
    readonly updatedAt: Date;
    readonly id: IPropertyHistory["id"];
}

const PropertyHistory = (data: IPropertyHistory): IPropertyHistoryEntity => {
    const propertyHistory: IPropertyHistoryEntity = {
        id: data.id,
        files: data.li_anexos,
        modifiedBy: data.user?.usu_nome,
        observation: data.li_observacao,
        realetedBy:
            data.li_related_by === "geomSubscription" ? "geom" : "subscription",
        subscription: data.inscricao,
        updatedAt: data.updated_at,
    };

    Object.freeze(propertyHistory);

    return propertyHistory;
};

export default PropertyHistory;
