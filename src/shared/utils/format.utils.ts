export const parseBrazilianNumberToFloat = (value: string): number | null => {
    if (!value) return null;
    const normalized = value.replace(/\./g, "").replace(",", ".");
    const parsed = parseFloat(normalized);
    return Number.isNaN(parsed) ? null : Math.round(parsed * 100) / 100;
};
