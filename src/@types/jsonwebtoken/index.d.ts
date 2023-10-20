type UserPayloadType = {
    userId: string;
    email: string;
};

declare module "jsonwebtoken" {
    export interface JwtPayload {
        user: UserPayloadType;
    }
}

export {};
