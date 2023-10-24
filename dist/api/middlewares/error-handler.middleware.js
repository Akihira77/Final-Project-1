import { StatusCodes } from "../../utils/constant.js";
import { BadRequestError, UnauthenticatedError, SchemaError, } from "../../errors/main.error.js";
const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof BadRequestError) {
        res.status(err.statusCode).send({ msg: err.message });
    }
    else if (err instanceof UnauthenticatedError) {
        res.status(err.statusCode).send({ msg: err.message });
    }
    else if (err instanceof SchemaError) {
        res.status(err.statusCode).send({ name: err.name, errors: err.errors });
    }
    else {
        res.status(StatusCodes.InternalServerError500).send({ err });
    }
    return;
};
export default errorHandlerMiddleware;
