const express = require("express")
const cors = require("cors")
require("dotenv").config()

const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/users")
const tableRoutes = require("./routes/tables")


const app = express()

app.use(cors())
app.use(express.json())

app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/tables", tableRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

