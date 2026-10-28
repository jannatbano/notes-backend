const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  forgotPassword,
  resetPassword,
 } = require("../controllers/AuthController");
const { searchNotes, updateNote, deleteNote } = require("../controllers/NoteController");

router.post("/signup", signup);
router.post("/login", login);
router.post("/auth/forgot-password", forgotPassword);



module.exports = router;