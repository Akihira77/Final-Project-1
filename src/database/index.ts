import pg, { Pool, QueryResult, QueryResultRow } from "pg";
import { POSTGRESS } from "../config/env.config.js";

const pool = new Pool({
    connectionString: POSTGRESS,
    max: 100,
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 5,
});

export function query<TModel>(text: string, params?: any) {
    return pool.query<TModel extends QueryResultRow ? TModel : QueryResultRow>(
        text,
        params
    );
}

export async function migration() {
    const createUserTable = `CREATE TABLE IF NOT EXISTS Users (
        id UUID NOT NULL PRIMARY KEY,
        email VARCHAR(30) NOT NULL,
        password VARCHAR(255) NOT NULL
    )`;

    await query(createUserTable);
}
