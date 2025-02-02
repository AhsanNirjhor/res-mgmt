const { drizzle } = require("drizzle-orm/node-postgres")
const { Pool } = require("pg")
const { sql } = require("drizzle-orm")
require("dotenv").config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const db = drizzle(pool)

module.exports = { db, pool, sql }

