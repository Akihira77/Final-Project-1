import * as db from "../index.js";
class ReflectionRepository {
    async createReflection({ success, low_point, take_away, UserId, }) {
        const { rows: reflections } = await db.query(`INSERT INTO "Reflections" (success,low_point,take_away,userid) 
            VALUES ($1, $2, $3, $4);
            `, [success, low_point, take_away, UserId]);
        const reflection = reflections[0];
        return reflection;
    }
    async getAllReflections() {
        const { rows: reflections } = await db.query(`SELECT * FROM "Reflections"`);
        return reflections;
    }
    async getReflectionById(id) {
        const { rows: reflections } = await db.query(`SELECT * FROM "Reflections" WHERE "id" = $1`, [id]);
        return reflections[0];
    }
    async updateReflection(id, data) {
        const { rows: reflections } = await db.query(`UPDATE "Reflections" SET "success" = $1, "low_point" = $2, "take_away" = $3, "updatedAt" = CURRENT_TIMESTAMP WHERE "id" = $4 RETURNING *`, [data.success, data.low_point, data.take_away, id]);
        return reflections[0];
    }
    async deleteReflection(id) {
        await db.query(`DELETE FROM "Reflections" WHERE "id" = $1`, [id]);
    }
}
export default ReflectionRepository;
