import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.config.js";

export type AuthPayloadType = {
	user: {
		userId: string;
		email: string;
	};
};

export function jwtSign(payload: AuthPayloadType): string {
	return jwt.sign({ ...payload }, JWT_SECRET!);
}
