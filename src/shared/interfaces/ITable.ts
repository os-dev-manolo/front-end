export interface ITableColumns<T> {
    width?: any;
    name: string;
    key: string;
    dataKey: keyof T;
    k?: keyof T;
    render?: (
        value: T[keyof T],
        record: T
    ) => string | number | React.ReactNode | null;
    headerClick?: (key: keyof T, order: "ASC" | "DESC") => void;
}

export type ITableDataSource = Record<string, unknown>;

export interface ITable {
    thead: { label: string; value: string }[];
    tbody: unknown[][];
}
