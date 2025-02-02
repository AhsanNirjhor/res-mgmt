const { pgTable, serial, text, varchar } = require("drizzle-orm/pg-core")

const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  role: varchar("role", { length: 50 }).notNull().default("staff"),
})

module.exports = { users }

