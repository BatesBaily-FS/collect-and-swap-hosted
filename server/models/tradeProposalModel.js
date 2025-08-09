const mongoose = require("mongoose");

const validStatuses = ["pending", "accepted", "rejected", "cancelled"];

const tradePropSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookOffered: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    bookDesired: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    notes: { type: String },
    status: {
      type: String,
      required: true,
      enum: validStatuses,
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tradeProposal", tradePropSchema);
