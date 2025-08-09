const BookClub = require("../models/bookClubModel");

exports.createBookClub = async (req, res) => {
  try {
    // update req.body when turning on auth
    const { clubName, description, relatedTo, creatorId } = req.body;
    // const creatorId = req.auth && req.auth.sub;

    if (!clubName) {
      return res.status(400).json({ error: "Club name is required" });
    }
    const club = await BookClub.create({
      clubName,
      description,
      relatedTo,
      creatorId,
      memberIds: [creatorId],
    });

    res.status(201).json(club);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: "Club name must be unique" });
    }
    res.status(500).json({ error: err.message });
  }
};

exports.getAllClubs = async (req, res) => {
  try {
    const clubs = await BookClub.find().populate("creatorId", "name email");
    res.json(clubs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getClubById = async (req, res) => {
  try {
    const club = await BookClub.findById(req.params.clubId)
      .populate("creatorId", "name email")
      .populate("memberIds", "name email");
    if (!club) return res.status(404).json({ error: "Club not found" });
    res.json(club);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.joinClub = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }
    // const userId = req.auth && req.auth.sub;
    const club = await BookClub.findById(req.params.clubId);
    if (!club) return res.status(404).json({ error: "Club not found" });

    if (club.memberIds.includes(userId)) {
      return res.status(400).json({ error: "Already a member" });
    }

    club.memberIds.push(userId);
    await club.save();

    res.json(club);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
