export function objectKeyBy<T, K extends keyof T>(
    object: T,
    by: K
): { [key: string | number]: Exclude<T, K> } {
    if (typeof object !== "object" || !object) throw new Error("invalid_type");

    let newObject = {} as Record<string, unknown>;

    Object.keys(object).forEach((key) => {
        if (key !== by) {
            newObject = { [by as string]: { ...newObject } };
        } else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            newObject[key] = object[key];
        }
    });

    return newObject as any;
}

// export function filterObject(
//     object: object,
//     { by, type }: { type: "key" | "value"; by: unknown }
// ) {
//     const newObject: Record<string, unknown> = {};

//     Object.entries(object).forEach(([key, value]) => {
//         if (type === "key") {
//             if (key !== by) newObject[key] = value;
//         } else {
//             if (typeof by === "object" && !Array.isArray(object)) newObject[key] = value
//             else 
//         }
//     });

//     return newObject;
// }
