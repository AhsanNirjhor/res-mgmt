const { db } = require("../config/database")
const { users } = require("../models/user")
const { eq } = require("drizzle-orm")

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await db.select().from(users)
    res.json(allUsers)
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" })
  }
}

exports.getUserById = async (req, res) => {
  const { id } = req.params
  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, Number.parseInt(id)))
      .limit(1)
    if (user.length === 0) {
      return res.status(404).json({ error: "User not found" })
    }
    res.json(user[0])
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" })
  }
}

exports.updateUser = async (req, res) => {
  const { id } = req.params
  const { username, email, role } = req.body
  try {
    const updatedUser = await db
      .update(users)
      .set({ username, email, role })
      .where(eq(users.id, Number.parseInt(id)))
      .returning()
    if (updatedUser.length === 0) {
      return res.status(404).json({ error: "User not found" })
    }
    res.json(updatedUser[0])
  } catch (error) {
    res.status(500).json({ error: "Error updating user" })
  }
}

exports.deleteUser = async (req, res) => {
  const { id } = req.params
  try {
    const deletedUser = await db
      .delete(users)
      .where(eq(users.id, Number.parseInt(id)))
      .returning()
    if (deletedUser.length === 0) {
      return res.status(404).json({ error: "User not found" })
    }
    res.json({ message: "User deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" })
  }
}

