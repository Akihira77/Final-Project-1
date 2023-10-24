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

    async getAllReflections(): Promise<ReflectionModelType[]> {
        const { rows: reflections } = await db.query<ReflectionModelType>(
            `SELECT * FROM "Reflections"`
        );

        return reflections;
    }

    async getReflectionById(id: number): Promise<ReflectionModelType | undefined> {
        const { rows: reflections } = await db.query<ReflectionModelType>(
            `SELECT * FROM "Reflections" WHERE "id" = $1`,
            [id]
        );

        return reflections[0];
    }


    // async updateReflection(id: number, data: Partial<ReflectionModelType>): Promise<ReflectionModelType | undefined> {
    //     const { rows: reflections } = await db.query<ReflectionModelType>(
    //         `UPDATE "Reflections" SET "success" = $1, "low_point" = $2, "take_away" = $3, "updatedAt" = CURRENT_TIMESTAMP WHERE "id" = $4 RETURNING *`,
    //         [data.success, data.low_point, data.take_away, id]
    //     );

    //     return reflections[0];
    // }

    // async deleteReflection(id: number): Promise<void> {
    //     await db.query(`DELETE FROM "Reflections" WHERE "id" = $1`, [id]);
    // }

}

export default ReflectionRepository;
