const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Book = require("../models/bookModel");
// const { requireAuth } = require("../middleware/auth");

router.get("/", async (req, res) => {
  console.log("Received GET /api/books: with query", req.query);
  try {
    const filter = {};
    if (req.query.owner) {
      filter.owner = req.query.owner;
    }
    const books = await Book.find(filter);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  console.log("Received POST /api/books:", req.body);
  try {
    const { googleBookId, title, authors, description, thumbnail, owner } =
      req.body;

    const existing = await Book.findOne({ googleBookId, owner });
    if (existing) {
      return res
        .status(400)
        .json({ error: "Book is already in your collection" });
    }

    const book = new Book({
      googleBookId,
      title,
      authors,
      description,
      thumbnail,
      owner,
    });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Receiving ID:", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log("Invalid ObjectID format");
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const book = await Book.findById(id);

    if (!book) {
      console.log("Book not found in DB");
      return res.status(404).json({ error: "Book not found" });
    }

    console.log("Book found:", book.title);
    return res.json(book);
  } catch (err) {
    console.error("Error fetching book:\n", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      console.log("Book not found");
      return res.status(404).json({ error: "Book not found in DB" });
    }

    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({ message: "Book Deleted Successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
