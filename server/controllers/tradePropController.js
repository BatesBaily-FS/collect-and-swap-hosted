const TradeProposal = require("../models/tradeProposalModel");
const User = require("../models/userModel");

// create proposal
exports.createProposal = async (req, res) => {
  try {
    const sender = req.body.sender;
    if (!sender) {
      return res.status(400).json({ error: "Sender Id is required" });
    }

    const { bookOffered, bookDesired, notes, status } = req.body;

    const proposal = new TradeProposal({
      sender,
      bookOffered,
      bookDesired,
      notes,
      status,
    });
    await proposal.save();

    await User.findByIdAndUpdate(sender, {
      $push: { tradeProposals: proposal._id },
    });

    res.status(201).json(proposal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all
exports.getAllProposals = async (req, res) => {
  try {
    const proposal = await TradeProposal.find()
      .populate("sender", "username email")
      .populate("bookOffered", "title authors")
      .populate("bookDesired", "title authors");
    if (!proposal)
      return res.status(404).json({ error: "Proposal not found " });
    res.json(proposal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get users trade proposals
exports.getUsersProposals = async (req, res) => {
  try {
    const userId = req.user_id || req.params.userId;
    const proposals = await TradeProposal.find({ sender: userId })
      .populate("sender", "username email")
      .populate("bookOffered", "title authors")
      .populate("bookDesired", "title authors");
    res.json(proposals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get by id
exports.getProposalById = async (req, res) => {
  try {
    const proposal = await TradeProposal.findById(req.params.id)
      .populate("sender", "username email")
      .populate("bookOffered", "title authors")
      .populate("bookDesired", "title authors");
    if (!proposal)
      return res.status(404).json({ error: "Proposal not found " });
    res.json(proposal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// update by if
exports.updatedProposalById = async (req, res) => {
  try {
    const proposal = await TradeProposal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!proposal) return res.status(404).json({ error: "Proposal not found" });
    res.json(proposal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// delete proposal
exports.deleteProposal = async (req, res) => {
  try {
    const proposal = await TradeProposal.findByIdAndDelete(req.params.id);

    if (!proposal) return res.status(404).json({ error: "Proposal not found" });

    // if (proposal.sender.toString() !== req.auth.sub) {
    //   return res.status(403).json({ error: "Forbidden" });
    // }

    res.json({ message: "Proposal deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
