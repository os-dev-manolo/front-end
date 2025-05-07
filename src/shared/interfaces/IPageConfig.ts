import { SearchParamsScreenEnum } from "../enums/search-params.enum";
import { SelectOptions } from "./ISelectOptions";

export interface IFields {
    label: string;
    isDisabled?: boolean;
    key?: string;
    fieldType: "number" | "date" | "text" | "dateRange" | "password";
}

export interface ISelect extends Omit<IFields, "fieldType"> {
    fieldType: "select";
    options?: SelectOptions[];
    isClearable?: boolean;
}

export interface IAutocomplete extends Omit<ISelect, "fieldType" | "options"> {
    fieldType: "autocomplete";
    urlToFetch: string;
    optionsLabel: string;
    optionsValue?: string;
    isClearable?: boolean;
}
export interface IRelation extends Omit<ISelect, "fieldType" | "options"> {
    fieldType: "relation";
    fields: IFields[];
}

export interface IFormsProps {
    type?: SearchParamsScreenEnum;
}

export type FieldsType = IFields | ISelect | IAutocomplete | IRelation;

export type IGrpStandardPageConfig<T> = {
    api: { path: string };
    fields: Record<keyof T, FieldsType>;
};

export type IGbpStandardPageConfig<T> = {
    api: { path: string };
    fields: Record<keyof T, FieldsType>;
};
