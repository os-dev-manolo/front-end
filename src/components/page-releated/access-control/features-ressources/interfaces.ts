import { FormHandles } from "@unform/core";
import { MutableRefObject } from "react";
import { IAllowedFeatures } from "../../../../shared/interfaces/IFeatures";

export interface FeatureAndRessourcesProps {
    parentScope: string;
    featuresLabels: Record<
        string,
        { label: string; order: number; actions: string[] }
    >;
    ressourcesLabels?: Record<string, string>;
    formRef?: MutableRefObject<FormHandles | null>;
    roleAllowedFeatures?: IAllowedFeatures[];
}
