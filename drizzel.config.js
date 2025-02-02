require("dotenv").config()

/** @type { import("drizzle-kit").Config } */
module.exports = {
  schema: "./src/models",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
}
