export interface ICreateSearchParams<T> {
    select?: (keyof T)[];
    where?: Record<keyof T, unknown>;
    limit?: number;
    offset?: number;
    order?: { type: "ASC" | "DESC"; by: keyof T };
    relations?: string[];
}
