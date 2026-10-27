const express = require("express");
const router = express.Router();

const {
  addNote,
  getNotes,
  searchNotes,
  updateNote,
  deleteNote,
} = require("../controllers/NoteController");

router.post("/", addNote);
router.get("/", getNotes);
router.get("/search", searchNotes);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

module.exports = router;