const mongoose = require("mongoose");
const subjectSchema = new mongoose.Schema({
  title: { type: String, required: [true, "title is required"] },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  file: {
    type: String,
    default:
      "https://docs.google.com/viewer?url=https://www.computer-pdf.com/pdf/0970-data-structures.pdf",
  },
  category: {
    type: String,
    enum: ["exam", "exercices", "course"],
    required: [true, "category is required"],
  },
  class: { type: String, required: [true, "class is required"] },
  speciality: String,
  added: { type: Date, default: Date.now() },
  updated: {type: Date, default: Date.now()}
});
module.exports = Subject = mongoose.model("subject", subjectSchema);
