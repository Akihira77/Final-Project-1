import * as db from "../index.js";
class ReflectionRepository {
    async createReflection({ success, low_point, take_away, UserId, }) {
        const { rows: reflections } = await db.query(`INSERT INTO "Reflections" (success,low_point,take_away,userid) 
            VALUES ($1, $2, $3, $4);
            `, [success, low_point, take_away, UserId]);
        const reflection = reflections[0];
        return reflection;
    }
    async getAllReflections(userId) {
        const { rows: reflections } = await db.query(`SELECT * FROM "Reflections" WHERE "userid" = $1`, [userId]);
        return reflections;
    }
    async getReflectionById(id, userId) {
        const { rows: reflections } = await db.query(`SELECT * FROM "Reflections" WHERE "id" = $1 AND "userid" = $2 ORDER BY ID`, [id, userId]);
        return reflections[0];
    }
    async updateReflectionById(id, { success, low_point, take_away, }) {
        const { rows: reflections } = await db.query(`UPDATE "Reflections" 
             SET success = $2,
                 low_point = $3,
                 take_away = $4
             WHERE "id" = $1
             RETURNING *
            `, [id, success, low_point, take_away]);
        return reflections[0];
    }
    async deleteReflectionById(id) {
        const { rowCount } = await db.query(`DELETE FROM "Reflections" WHERE "id" = $1`, [id]);
        return rowCount > 0;
    }
}
export default ReflectionRepository;
