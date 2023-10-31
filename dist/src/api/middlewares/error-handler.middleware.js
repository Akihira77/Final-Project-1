import { BadRequestError, UnauthenticatedError, SchemaError, InternalServerError, } from "../../errors/main.error.js";
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
    else if (err instanceof InternalServerError) {
        res.status(err.statusCode).send({ msg: err.message });
    }
    return;
};
export default errorHandlerMiddleware;
