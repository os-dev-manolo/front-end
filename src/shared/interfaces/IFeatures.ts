import { FeaturesEnum } from "../enums/features.enum";

export interface IRessources {
    id: number;
    res_nome: string;
    res_proveniente: string;
    created_at: Date;
    updated_at: Date;
}

export interface IFeatures {
    id: number;
    feat_nome: FeaturesEnum;
    created_at: Date;
    updated_at: Date;
    ressources: Array<{
        feat_id: number;
        feat_res_id: number;
        res_id: number;
        ressource: IRessources;
    }>;
}

export interface IAllowedFeatures {
    ressources: { name: string; from: string; id: number }[] | "*";
    featureDetails: {
        id: number;
        name: FeaturesEnum;
    };
    actions: string[] | "*";
}
