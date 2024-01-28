export interface PageRequest<T> {
    filterRequest: T;
    page: number;
    size: number;
    sortColumn?: string;
    sortDir?: string;
}
