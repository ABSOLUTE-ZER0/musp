const express = require("express");
const router = express.Router()
const auth = require("../middleware/auth");
const Book = require("../models/Book");

router.get("/", auth, async (req, res) => {
  try {
    let book = await Book.find({});
    res.json(book)
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error")
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    let book = await Book.findById(req.params.id);
    let userId = req.user.id

    if (!book) {
      return res.status(400).json({
        msg: "Book not found"
      })
    }

    if (book.requestToBorrow == userId) {
      await Book.updateOne({ _id: req.params.id }, { requestToBorrow: undefined });
      return res.json("Successfully removed!")
    }

    if (book.requestToBorrow) {
      return res.status(401).json({
        msg: "Only one person can apply for borrowing a book at any given time"
      })
    }
    
    await Book.updateOne({ _id: req.params.id }, { requestToBorrow: userId });

    res.json("Successfully added!")

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error")
  }
});

module.exports = router;
