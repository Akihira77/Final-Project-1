import { NextFunction, Request, Response } from "express";
import { UnauthenticatedError } from "../../errors/main.error.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/env.config.js";

const authentication = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthenticatedError("Invalid Credentials");
    }

    try {
        const token = authHeader.split(" ")[1];

        const payload = <jwt.JwtPayload>jwt.verify(token!, JWT_SECRET);

        req.user = payload.user;
        next();
    } catch (error) {
        throw new UnauthenticatedError("Authentication Failed");
    }
};

export default authentication;
