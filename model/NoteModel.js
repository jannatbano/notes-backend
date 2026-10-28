const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
)
  user: { type: mongoose.Schema.Types.ObjectId
     ref: "User"
     required: true }

module.exports = mongoose.model("Note", noteSchema);