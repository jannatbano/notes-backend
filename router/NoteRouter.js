const express = require("express");
const auth =require('../middleware/auth')

const router = express.Router();
router.use(auth);
const {
  addNote,
  getNotes,
  searchNotes,
  updateNote,
  deleteNote,
} = require("../controllers/NoteController");

router.post("/", auth,addNote);
router.get("/", auth,getNotes);
router.get("/search",auth, searchNotes);
router.put("/:id",auth,updateNote);
router.delete("/:id", auth,deleteNote);

module.exports = router;