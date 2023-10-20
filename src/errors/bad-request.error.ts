import { StatusCodes } from "../utils/constant.js";

class BadRequestError extends Error {
    readonly statusCode: number;
    constructor(message: string) {
        super(message);
        this.statusCode = StatusCodes.BadRequest400;
    }
}

export default BadRequestError;
