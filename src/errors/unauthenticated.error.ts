import { StatusCodes } from "../utils/constant.js";

class UnauthenticatedError extends Error {
    readonly statusCode: number;
    constructor(message: string) {
        super(message);
        this.statusCode = StatusCodes.Unauthorized401;
    }
}

export default UnauthenticatedError;
