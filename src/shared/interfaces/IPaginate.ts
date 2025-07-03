export interface IPaginate {
    limit: number;
    offset: number;
    currentPage: number;
    total: number;
    totalPages: number;
}

export interface IPaginateApiResponse<T> {
    exceptions: never[];
    data: T;
    paginate: IPaginate;
}
