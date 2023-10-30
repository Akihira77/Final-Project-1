import * as db from "../index.js";
import { v4 as uuidv4 } from "uuid";
import {
    ReflectionModelType,
    CreateReflectionRequestDTOType,
    CreateReflectionResponseDTOType,
} from "../models/reflection.model.js";

class ReflectionRepository {
    async createReflection({
        success,
        low_point,
        take_away,
        UserId,
    }: CreateReflectionRequestDTOType): Promise<CreateReflectionResponseDTOType> {
        const { rows: reflections } = await db.query<CreateReflectionResponseDTOType>(
            `INSERT INTO "Reflections" (success,low_point,take_away,userid) 
            VALUES ($1, $2, $3, $4);
            `,
            [success, low_point, take_away, UserId]
        );

        const reflection = reflections[0]!;

        return reflection;
    }

    async getAllReflections(userId: string): Promise<ReflectionModelType[]> {
        const { rows: reflections } = await db.query<ReflectionModelType>(
            `SELECT * FROM "Reflections" WHERE "userid" = $1`,
            [userId]
        );
    
        return reflections;
    }

    async getReflectionById(id: number, userId: string): Promise<ReflectionModelType | undefined> {
    const { rows: reflections } = await db.query<ReflectionModelType>(
        `SELECT * FROM "Reflections" WHERE "id" = $1 AND "userid" = $2 ORDER BY ID`,
        [id, userId]
    );

    return reflections[0];
}

    async updateReflectionById(id: number, {
        success,
        low_point,
        take_away,
    }: CreateReflectionRequestDTOType): Promise<CreateReflectionResponseDTOType | undefined> {
        const { rows: reflections } = await db.query<CreateReflectionResponseDTOType>(
            `UPDATE "Reflections" 
             SET success = $2,
                 low_point = $3,
                 take_away = $4
             WHERE "id" = $1
             RETURNING *
            `,
            [id, success, low_point, take_away]
        );

        return reflections[0];
    }
    
    async deleteReflectionById(id: number): Promise<boolean> {
        const { rowCount } = await db.query(
            `DELETE FROM "Reflections" WHERE "id" = $1`,
            [id]
        );

        return rowCount > 0;
    }

}

export default ReflectionRepository;
