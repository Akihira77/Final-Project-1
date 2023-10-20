import { Request } from "express";

type UserType = {
    userId: string;
    email: string;
};

declare module "express" {
    export interface Request extends Request {
        user: UserType;
    }
}
