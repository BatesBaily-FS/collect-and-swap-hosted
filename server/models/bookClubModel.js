const mongoose = require("mongoose");

const BookClubSchema = new mongoose.Schema(
  {
    clubName: { type: String, required: true, unique: true, trim: true },
    description: { type: String, default: "" },
    relatedTo: { type: String, required: true },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    memberIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("bookClub", BookClubSchema);
