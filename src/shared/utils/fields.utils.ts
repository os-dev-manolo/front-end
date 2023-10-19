import { SelectOptions } from "../interfaces/ISelectOptions";
import { filterEmptyObjects, filterObjectEmptyValues } from "./json.utils";
import { Regex } from "./regex";

export const formatDataToSelectOptions = (
    data: Record<string, unknown>[],
    label: string,
    value = "id"
): SelectOptions[] => {
    return data.map((element) => ({
        label: String(element[label]),
        value:
            typeof element[value] === "number"
                ? (element[value] as number)
                : String(element[value]),
    }));
};

/**
 * formata os filtros a serem enviados para api
 * * */
export const formatFilter = (data: Record<string, unknown>) => {
    const newData = filterEmptyObjects(filterObjectEmptyValues(data));

    if (!newData) return {};

    return Object.entries(newData).reduce((accumulator, [key, value]) => {
        let newValue = value;

        if (
            typeof value === "string" &&
            value !== "true" &&
            value !== "false" &&
            Regex.ONLY_NUMBERS.test(value)
        ) {
            newValue = `ILIKE(${value})`;
        }

        return Object.assign(accumulator, { [key]: newValue });
    }, {});
};
