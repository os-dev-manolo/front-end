import { MaskTypes } from "../interfaces/IMask";
import Masks from "./mask.utils";

export function isJson(test: string) {
    try {
        JSON.parse(test);
        return true;
    } catch {
        return false;
    }
}

export const filterObjectEmptyValues = (object: Record<string, unknown>) => {
    const newObject = { ...object };

    Object.entries(newObject).forEach(([key, value]) => {
        if (!value) delete newObject[key];

        if (value && typeof value === "object") {
            if (!Object.keys(value).length) delete newObject[key];
            else
                newObject[key] = filterObjectEmptyValues(
                    value as Record<string, unknown>
                );
        }
    });

    return newObject;
};

export const filterEmptyObjects = (object: Record<string, unknown>) => {
    const newObject = { ...object };

    if (!Object.keys(newObject).length) return undefined;

    Object.entries(newObject).forEach(([key, value]) => {
        if (value && typeof value === "object") {
            if (!Object.keys(value).length) delete newObject[key];
            else
                newObject[key] = filterEmptyObjects(
                    value as Record<string, unknown>
                );
        }
    });

    return newObject;
};

type DataTypes = MaskTypes | "none" | null | { custom: string | string[] };

type Flatten<T> = T extends unknown[] ? T[number] : T;

type FormatResponse<T> = Record<
    Partial<keyof Flatten<T>>,
    string | number | boolean
>;

function formatedValue(type: DataTypes, actualValue: unknown) {
    if (typeof type === "object") {
        return type?.custom;
    }

    const typedValue = actualValue as string;

    const maskFunction = Masks[type as MaskTypes];

    if (maskFunction) return maskFunction(typedValue);

    return actualValue;
}

// export function formatResponse<T>({
//     data,
//     transform,
// }: {
//     data: T;
//     transform: Partial<Record<keyof Flatten<T>, DataTypes>>;
// }): FormatResponse<T> {
//     if (typeof data !== "object") throw new Error("invalid_type");

//     return Object.entries(data).reduce((acc, [key, value]) => {
//         const typedKey = key as keyof Flatten<T>;

//         return Object.assign(acc, {
//             [typedKey]: transform[typedKey]
//                 ? formatedValue(transform[typedKey] as DataTypes, value)
//                 : value,
//         });
//     }, {} as Record<keyof Flatten<T>, string | number | boolean>);
// }
