import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "../../utils/constant.js";
import {
    BadRequestError,
    UnauthenticatedError,
} from "../../errors/main.error.js";

const errorHandlerMiddleware = async (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof BadRequestError) {
        res.status(err.statusCode).send({ msg: err.message });
    } else if (err instanceof UnauthenticatedError) {
        res.status(err.statusCode).send({ msg: err.message });
    } else {
        res.status(StatusCodes.InternalServerError500).send({ err });
    }

    return;
};

export default errorHandlerMiddleware;
