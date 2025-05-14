import { FeaturesEnum } from "../../../enums/features.enum";

export interface IAuthorization {
    ressources: { name: string; from: string; id: number }[] | "*";
    featureDetails: {
        id: number;
        name: FeaturesEnum;
    };
    actions: string[] | "*";
}
