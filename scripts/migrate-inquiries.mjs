import fs from "node:fs";
import dotenv from "dotenv";
import { neon } from "@neondatabase/serverless";

dotenv.config({ path: process.argv[2] || ".env.local" });
const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL missing");
const sql = neon(url);
const schema = fs.readFileSync(new URL("./inquiries.sql", import.meta.url), "utf8");
for (const statement of schema.split(";").map((item) => item.trim()).filter(Boolean)) await sql.query(statement);
console.log("inquiries schema ready");
