import {
    LoginRequestDTO,
    LoginResponse,
    RegisterRequestDTO,
    RegisterResponseDTO,
    UserDTO,
    UserModel,
} from "./../models/user.model";
import * as db from "../index.js";
import { v4 as uuidv4 } from "uuid";
import { hashPassword, verifyPassword } from "../../utils/bcrypt.js";
import { jwtSign } from "../../utils/jwt.js";

class UserRepository {
    async register({
        email,
        password,
    }: RegisterRequestDTO): Promise<RegisterResponseDTO> {
        const userId = uuidv4();
        const hashedPassword = await hashPassword(password);

        const { rows: users } = await db.query<RegisterResponseDTO>(
            `INSERT INTO "Users" VALUES ($1, $2, $3)`,
            [userId, email, hashedPassword]
        );

        const user = users[0]!;

        return user;
    }

    async login({ email, password }: LoginRequestDTO): Promise<LoginResponse> {
        const { rows: users } = await db.query<UserModel>(
            `SELECT "id", "email", "password" FROM "Users" WHERE "email" = $1`,
            [email]
        );

        const user = users[0];

        if (!user) {
            return null;
        }

        if (!verifyPassword(password, user.password)) {
            return "Email or Password is not correct";
        }

        const token = jwtSign({ userId: user.id, email: user.email });

        return { access_token: token };
    }

    async delete(id: string): Promise<void> {
        await db.query<RegisterResponseDTO>(
            `DELETE FROM "Users" WHERE "id" = ($1)`,
            [id]
        );
    }

    async getAll(): Promise<UserDTO[]> {
        const { rows: users } = await db.query<UserDTO>(
            `SELECT "id", "email" FROM "Users"`
        );

        return users;
    }
}

export default UserRepository;
