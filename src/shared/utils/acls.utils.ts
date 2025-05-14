export const filterValidData = (data: Record<number, "true" | "false">[]) => {
    return Object.entries(data)
        .filter(([, value]) => value === "true")
        .map(([key]) => +key);
};
