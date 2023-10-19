/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldsType, IGrpStandardPageConfig } from "../interfaces/IPageConfig";
import { ITable } from "../interfaces/ITable";

export function formatDataToTable<T>(
    data: T[],
    labels:
        | Partial<Record<keyof T, string>>
        | Partial<IGrpStandardPageConfig<T>["fields"]>
    // ): { thead: ITable["thead"]; tbody: T[keyof T][][] } {
) {
    if (!data[0])
        return {
            thead: Object.entries(labels).map(([key, value]) => ({
                label: (value as any).label || (value as string),
                value: key,
            })),
            tbody: [[]],
        };

    const desiredFields = Object.keys(data[0]).filter(
        (element) => !!labels[element as keyof T]
    );

    const thead = desiredFields.map((element) => ({
        label:
            ((labels[element as keyof T] as FieldsType)?.label as string) ||
            (labels[element as keyof T] as string),
        value: element,
    }));

    // const tbody = data.map((element) =>
    //     Object.entries(element)
    //         .filter(([key]) => desiredFields.includes(key))
    //         .map(([, value]) => value)
    // );
    return {};
    // return { thead, tbody };
}
