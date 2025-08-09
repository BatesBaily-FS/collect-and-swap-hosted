const Event = require("../models/eventModel");

exports.createEvent = async (req, res) => {
  try {
    const { eventName, description, date, location, creatorId } = req.body;

    if (!eventName) {
      return res.status(400).json({ error: "Event name is required" });
    }

    const event = await Event.create({
      eventName,
      description,
      date,
      location,
      creatorId,
    });

    res.status(201).json(event);
  } catch (err) {
    if (err.code === 400) {
      return res.status(400).json({
        error:
          "eventName, date, and location are required. Please add those fields.",
      });
    }
    res.status(500).json({ error: err.message });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("creatorId", "name email");
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      "creatorId",
      "name email"
    );
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
