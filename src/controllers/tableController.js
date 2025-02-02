const { db } = require("../config/database")
const { tables } = require("../models/table")
const { eq } = require("drizzle-orm")

exports.getAllTables = async (req, res) => {
  try {
    const allTables = await db.select().from(tables)
    res.json(allTables)
  } catch (error) {
    res.status(500).json({ error: "Error fetching tables" })
  }
}

exports.getTableById = async (req, res) => {
  const { id } = req.params
  try {
    const table = await db
      .select()
      .from(tables)
      .where(eq(tables.id, Number.parseInt(id)))
      .limit(1)
    if (table.length === 0) {
      return res.status(404).json({ error: "Table not found" })
    }
    res.json(table[0])
  } catch (error) {
    res.status(500).json({ error: "Error fetching table" })
  }
}

exports.createTable = async (req, res) => {
  const { number, capacity, status } = req.body
  try {
    const newTable = await db
      .insert(tables)
      .values({
        number,
        capacity,
        status,
      })
      .returning()
    res.status(201).json(newTable[0])
  } catch (error) {
    res.status(500).json({ error: "Error creating table" })
  }
}

exports.updateTable = async (req, res) => {
  const { id } = req.params
  const { number, capacity, status } = req.body
  try {
    const updatedTable = await db
      .update(tables)
      .set({ number, capacity, status })
      .where(eq(tables.id, Number.parseInt(id)))
      .returning()
    if (updatedTable.length === 0) {
      return res.status(404).json({ error: "Table not found" })
    }
    res.json(updatedTable[0])
  } catch (error) {
    res.status(500).json({ error: "Error updating table" })
  }
}

exports.deleteTable = async (req, res) => {
  const { id } = req.params
  try {
    const deletedTable = await db
      .delete(tables)
      .where(eq(tables.id, Number.parseInt(id)))
      .returning()
    if (deletedTable.length === 0) {
      return res.status(404).json({ error: "Table not found" })
    }
    res.json({ message: "Table deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: "Error deleting table" })
  }
}

exports.updateTableStatus = async (req, res) => {
  const { id } = req.params
  const { status } = req.body
  try {
    const updatedTable = await db
      .update(tables)
      .set({ status })
      .where(eq(tables.id, Number.parseInt(id)))
      .returning()
    if (updatedTable.length === 0) {
      return res.status(404).json({ error: "Table not found" })
    }
    res.json(updatedTable[0])
  } catch (error) {
    res.status(500).json({ error: "Error updating table status" })
  }
}

