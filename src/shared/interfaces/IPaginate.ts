export interface IPaginate {
    limit: number;
    offset: number;
    currentPage: number;
    total: number;
    totalPages: number;
}

export interface IPaginateApiResponse<T> {
    data: T;
    paginate: IPaginate;
}
