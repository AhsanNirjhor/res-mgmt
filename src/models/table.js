const { pgTable, serial, integer, varchar } = require("drizzle-orm/pg-core")

const tables = pgTable("tables", {
  id: serial("id").primaryKey(),
  number: integer("number").notNull().unique(),
  capacity: integer("capacity").notNull(),
  status: varchar("status", { length: 50 }).notNull().default("available"),
})

module.exports = { tables };