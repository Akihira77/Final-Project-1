import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.config.js";

export function jwtSign(
    payload: Record<string, string | number | boolean>
): string {
    return jwt.sign({ user: payload }, JWT_SECRET!);
}
