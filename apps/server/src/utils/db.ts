import { Kysely, PostgresDialect } from "kysely";
import { type DB } from "../types/kysely";
import { Pool } from "pg";
import config from "config";
import * as pg from "pg";

const NUMERIC = 1700;
pg.types.setTypeParser(NUMERIC, (val) => {
  return parseFloat(val);
});

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({
      database: "postgres",
      host: config.get("DATABASE_URL"),
      port: config.get("DATABASE_PORT"),
      user: config.get("DATABASE_USERNAME"),
      password: config.get("DATABASE_PASSWORD"),
      max: 10,
    }),
  }),
});
