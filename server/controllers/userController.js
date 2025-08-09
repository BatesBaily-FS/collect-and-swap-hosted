const User = require("../models/userModel");

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUserByAuth0Id = async (req, res) => {
  try {
    const user = await User.findOne({ auth0Id: req.params.auth0Id });
    if (!user) return res.status(404).json({ error: "User not found " });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { auth0Id: req.params.auth0Id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!user) return res.status(404).json({ error: "User not found " });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ auth0Id: req.params.auth0Id });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
