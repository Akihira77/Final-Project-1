import pg from "pg";
import { POSTGRESS } from "../config/env.config.js";

const pool = new pg.Pool({
    connectionString: POSTGRESS,
    max: 100,
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 5,
});

export function query<TModel>(text: string, params?: any) {
    return pool.query<
        TModel extends pg.QueryResultRow ? TModel : pg.QueryResultRow
    >(text, params);
}

export async function migration() {
    const createUserTable = `CREATE TABLE IF NOT EXISTS "Users" (
        id UUID NOT NULL PRIMARY KEY,
        email VARCHAR(30) NOT NULL,
        password VARCHAR(255) NOT NULL
        )`;

    console.log(`Migration running`);
    await query(createUserTable);

    console.log(`Migration complete`);
}
