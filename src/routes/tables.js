const express = require("express")
const {
  getAllTables,
  getTableById,
  createTable,
  updateTable,
  deleteTable,
  updateTableStatus,
} = require("../controllers/tableController")
const { authenticate } = require("../middleware/auth")

const router = express.Router()

router.get("/", authenticate, getAllTables)
router.get("/:id", authenticate, getTableById)
router.post("/", authenticate, createTable)
router.put("/:id", authenticate, updateTable)
router.delete("/:id", authenticate, deleteTable)
router.patch("/:id/status", authenticate, updateTableStatus)

module.exports = router
