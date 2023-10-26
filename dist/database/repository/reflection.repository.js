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
}
export default ReflectionRepository;
