import { StatusCodes } from "../utils/constant.js";
class InternalServerError extends Error {
    statusCode;
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.InternalServerError500;
    }
}
export default InternalServerError;
