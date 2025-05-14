export class ApiError extends Error {
    constructor(message: string) {
        super("ApiError");
        this.name = "ApiError";
        this.message = message;
    }
}
