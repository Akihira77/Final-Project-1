import * as db from "../index.js";
import { v4 as uuidv4 } from "uuid";
import { hashPassword, verifyPassword } from "../../utils/bcrypt.js";
import { jwtSign } from "../../utils/jwt.js";
class UserRepository {
    async register({ email, password, }) {
        const userId = uuidv4();
        const hashedPassword = await hashPassword(password);
        const { rows: users } = await db.query(`INSERT INTO "Users" VALUES ($1, $2, $3) RETURNING "id", "email"`, [userId, email, hashedPassword]);
        const user = users[0];
        return user;
    }
    async login({ user, passwordRequest, }) {
        const { id, email, password } = user.UserModel;
        const isMatched = await verifyPassword(passwordRequest, password);
        if (!isMatched) {
            return "Email or password invalid!";
        }
        const token = jwtSign({ userId: id, email: email });
        return { access_token: token };
    }
    async getByEmail(email) {
        const { rows: users } = await db.query(`SELECT "id", "email", "password" FROM "Users" WHERE "email" = $1`, [email]);
        const user = users[0];
        return user;
    }
    async delete(id) {
        await db.query(`DELETE FROM "Users" WHERE "id" = ($1)`, [id]);
    }
    async getAll() {
        const { rows: users } = await db.query(`SELECT "id", "email" FROM "Users"`);
        return users;
    }
    async getById(id) {
        const { rows: users } = await db.query(`SELECT "id", "email", "password" FROM "Users" WHERE "id" = $1`, [id]);
        const user = users[0];
        return user;
    }
}
export default UserRepository;
