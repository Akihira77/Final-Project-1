import { UnauthenticatedError } from "../../errors/main.error.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/env.config.js";
const authentication = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthenticatedError("Unauthorized");
    }
    try {
        const token = authHeader.split(" ")[1];
        // console.log("Token:", token);
        const payload = jwt.verify(token, JWT_SECRET);
        // console.log("Payload:", payload);
        req.user = payload.user;
        // console.log("req.user:", payload);
        next();
    }
    catch (error) {
        throw new UnauthenticatedError("Authentication Failed");
    }
};
export default authentication;
