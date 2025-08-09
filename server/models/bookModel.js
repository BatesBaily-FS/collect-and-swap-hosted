const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  googleBookId: { type: String, required: true },
  title: { type: String, required: true },
  authors: [String],
  description: String,
  thumbnail: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Book", bookSchema);
