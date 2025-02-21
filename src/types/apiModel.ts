export type ApiResponse<T> = {
    data: T,
    httpStatus: string,
    message: string
}