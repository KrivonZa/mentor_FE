export type ApiResponse<T> = {
    data: T,
    httpStatus: string,
    message: string
}

export type Pagable<T> = {
    content: T[],
    totalPages: number,
    totalElements: number,
    last: true,
    size: number,
    number: number,
    sort: {
        sorted: boolean,
        unsorted: boolean,
        empty: boolean
    },
    first: boolean,
    numberOfElements: number,
    empty: boolean
}