const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    auth0Id: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true, minLength: 3 },
    profilePicture: {
      type: String,
      validate: {
        validator: function (v) {
          return v ? validator.isURL(v) : true;
        },
        message: (props) => `${props.value} is not a valid URL`,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Invalid Email"],
    },
    rating: { type: Number, default: 0 },
    name: { type: String, required: true, minLength: 1 },
    location: { type: String, default: "" },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    tradeProposals: [
      { type: mongoose.Schema.Types.ObjectId, ref: "TradeProposal" },
    ],
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    bookClubs: [{ type: mongoose.Schema.Types.ObjectId, ref: "BookClub" }],
    tokens: [{ type: Number, default: 0 }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
