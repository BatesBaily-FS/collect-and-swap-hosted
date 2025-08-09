const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/search", async (req, res) => {
  const { q } = req.query;
  try {
    const response = await axios.get(
      "https://www.googleapis.com/books/v1/volumes",
      {
        params: {
          q,
          maxResults: 10,
        },
      }
    );
    res.json(response.data.items);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch book from Google Books API" });
  }
});

router.get("/:volumeId", async (req, res) => {
  const { volumeId } = req.params;
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${volumeId}`
    );
    res.status(200).json(response.data);
  } catch (err) {
    console.error("Google Books API error:", err.message);
    res.status(500).json({ error: "Failed to fetch Google books details" });
  }
});

module.exports = router;
