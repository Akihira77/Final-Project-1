import { StatusCodes } from "../utils/constant.js";
class UnauthenticatedError extends Error {
    statusCode;
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.Unauthorized401;
    }
}
export default UnauthenticatedError;
