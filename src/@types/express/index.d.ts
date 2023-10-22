import { Request } from "express";

type UserType = {
    userId: string;
    email: string;
};

declare global {
    namespace Express {
        export interface Request extends Request {
            user: UserType;
        }
    }
}
