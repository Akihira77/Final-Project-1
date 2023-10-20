import {
    RegisterRequestDTO,
    RegisterResponseDTO,
    UserDTO,
} from "./../models/user.model";
import { UserModel } from "../models/user.model.js";
import * as db from "../index.js";
import { v4 as uuidv4 } from "uuid";

class UserRepository {
    async register({
        email,
        password,
    }: RegisterRequestDTO): Promise<RegisterResponseDTO> {
        const userId = uuidv4();
        const { rows: users } = await db.query<RegisterResponseDTO>(
            `INSERT INTO "Users" VALUES ($1, $2, $3)`,
            [userId, email, password]
        );

        const user = users[0]!;

        return user;
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
