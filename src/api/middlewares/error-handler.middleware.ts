import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "../../utils/constant.js";
import {
    BadRequestError,
    UnauthenticatedError,
    SchemaError,
    InternalServerError,
} from "../../errors/main.error.js";

const errorHandlerMiddleware = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (err instanceof BadRequestError) {
        res.status(err.statusCode).send({ msg: err.message });
    } else if (err instanceof UnauthenticatedError) {
        res.status(err.statusCode).send({ msg: err.message });
    } else if (err instanceof SchemaError) {
        res.status(err.statusCode).send({ name: err.name, errors: err.errors });
    } else if (err instanceof InternalServerError) {
        res.status(err.statusCode).send({ msg: err.message });
    }

    return;
};

export default errorHandlerMiddleware;
