// import { drizzle } from "drizzle-orm/node-postgres";
// import * as schema from "@/server/db/schema";
// import { Pool } from "pg";

// const client = new Pool({
//   connectionString: process.env.DATABASE_URL!,
// });

// // const pool = new Pool({
// //   host: "localhost",
// //   port: 5432,
// //   user: "admin",
// //   password: "admin",
// //   database: "kurashiki_db",
// // });

// export const db = drizzle(client, { schema });

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);
