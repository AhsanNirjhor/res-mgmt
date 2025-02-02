const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { db } = require("../config/database")
const { users } = require("../models/user")
const { eq } = require("drizzle-orm")

exports.register = async (req, res) => {
  const { username, email, password, role } = req.body

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await db
      .insert(users)
      .values({
        username,
        email,
        password: hashedPassword,
        role,
      })
      .returning()

    res.status(201).json(newUser[0])
  } catch (error) {
    res.status(500).json({ error: "Error registering user" })
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await db.select().from(users).where(eq(users.email, email)).limit(1)

    if (user.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password)

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password " })
    }

    const token = jwt.sign({ id: user[0].id, role: user[0].role }, process.env.JWT_SECRET, { expiresIn: "3d" })

    res.json({ token })
  } catch (error) {
    res.status(500).json({ error: "Error logging in" })
  }
}

