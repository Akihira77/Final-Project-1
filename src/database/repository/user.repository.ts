import * as db from "../index.js";
import { v4 as uuidv4 } from "uuid";
import { hashPassword, verifyPassword } from "../../utils/bcrypt.js";
import { AuthPayloadType, jwtSign } from "../../utils/jwt.js";
import {
	LoginRequestDTOType,
	LoginResponseDTOType,
	RegisterRequestDTOType,
	RegisterResponseDTOType,
	UserDTOType,
	UserModelType,
} from "../models/user.model.js";

class UserRepository {
	async register({
		email,
		password,
	}: RegisterRequestDTOType): Promise<RegisterResponseDTOType> {
		const userId = uuidv4();
		const hashedPassword = await hashPassword(password);

		const { rows: users } = await db.query<RegisterResponseDTOType>(
			`INSERT INTO "Users" VALUES ($1, $2, $3)`,
			[userId, email, hashedPassword]
		);

		const user = users[0]!;

		return user;
	}

	async login({
		user,
		passwordRequest,
	}: LoginRequestDTOType): Promise<LoginResponseDTOType> {
		const isMatched = await verifyPassword(passwordRequest, user.password);

		if (!isMatched) {
			return "Email or password invalid!";
		}

		const userAsPayload: AuthPayloadType = {
			user: { userId: user.id, email: user.email },
		};

		const token = jwtSign(userAsPayload);

		return { access_token: token };
	}

	async getByEmail(email: string): Promise<UserModelType | undefined> {
		const { rows: users } = await db.query<UserModelType>(
			`SELECT "id", "email", "password" FROM "Users" WHERE "email" = $1`,
			[email]
		);

		const user = users[0];
		return user;
	}

	async delete(id: string): Promise<void> {
		await db.query<RegisterResponseDTOType>(
			`DELETE FROM "Users" WHERE "id" = ($1)`,
			[id]
		);
	}

	async getAll(): Promise<UserDTOType[]> {
		const { rows: users } = await db.query<UserDTOType>(
			`SELECT "id", "email" FROM "Users"`
		);

		return users;
	}
}

export default UserRepository;
