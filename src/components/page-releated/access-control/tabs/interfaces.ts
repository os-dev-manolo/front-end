import { IAllowedFeatures } from "../../../../shared/interfaces/IFeatures";

export interface TabsProps {
    roleAllowedFeatures?: IAllowedFeatures[];
    onSubmit(data: IFormatedGrantedAccess[]): void;
}

type CheckboxResponse = "true" | "false";

export type IGrantedAccess = Record<
    string,
    {
        details: { featId: string; hasRessources: "true" | "false" };
        actions: Partial<
            Record<"read" | "update" | "create" | "delete", CheckboxResponse>
        >;
        ressources?: CheckboxResponse[];
    }
>;

export interface IFormatedGrantedAccess {
    featureId: number;
    actions: string[] | "*";
    ressources: number[] | "*";
}

export type IFormData = Record<"webgeo" | "grp", IGrantedAccess>;
