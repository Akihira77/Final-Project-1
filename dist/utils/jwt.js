import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.config.js";
export function jwtSign(payload) {
    return jwt.sign({ user: payload }, JWT_SECRET);
}
