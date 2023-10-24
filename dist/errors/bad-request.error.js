import { StatusCodes } from "../utils/constant.js";
class BadRequestError extends Error {
    statusCode;
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.BadRequest400;
    }
}
export default BadRequestError;
