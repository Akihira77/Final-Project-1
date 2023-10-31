type UserPayloadType = {
	userId: string;
	email: string;
};

declare module "jsonwebtoken" {
	interface JwtPayload {
		user: UserPayloadType;
	}
}

export {};
