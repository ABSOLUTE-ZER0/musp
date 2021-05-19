const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Book = require("../models/Book");
const User = require("../models/User");
var https = require("https");
const { check, validationResult } = require("express-validator");

// get a book to borrow

router.get("/borrow/:id", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    let bookId = req.params.id;
    global.googleBook = "";

    const book = await Book.findOne({ bookId: bookId });

    if (book) {
      res.json(book);
    } else {
      const request = https.request(
        {
          host: "www.googleapis.com",
          path: `/books/v1/volumes/${bookId}?key=AIzaSyBB-72oIaeYGiiKxGLvnsznDJvMfXaGNRo`,
          method: "GET",
        },
        function (response) {
          response.setEncoding("utf8");
          response.on("data", (chunk) => {
            googleBook += chunk;
          });
        }
      );
      request.end();

      setTimeout(() => {
        try {
          googleBook = JSON.parse(googleBook);

          if (googleBook.error) {
            return res.status(400).json({
              msg: "Book not found! Try again",
            });
          }

          googleBook = new Book({
            bookId: googleBook.id,
            title: googleBook.volumeInfo.title,
            subtitle: googleBook.volumeInfo.subtitle,
            authors: googleBook.volumeInfo.authors,
            publishedDate: googleBook.volumeInfo.publishedDate,
            description: googleBook.volumeInfo.description,
            pageCount: googleBook.volumeInfo.pageCount,
            averageRating: googleBook.volumeInfo.averageRating,
            bookImage: googleBook.volumeInfo.imageLinks.thumbnail,
            avaliability: true,
          });

          googleBook.save();

          res.json(googleBook);
        } catch (error) {
          console.log(error);
        }
      }, 500);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// borrow a book

router.post(
  "/borrow/:id",
  [
    [
      check("duration", "Please enter a duration in between 0 and 14 days!")
        .notEmpty()
        .isInt({ min: 0, max: 14 }),
      check("search", "Please enter somthing!").notEmpty(),
    ],
    auth,
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    try {
      let bookId = req.params.id;
      let duration = req.body.duration;
      var date = new Date();
      global.googleBook = "";

      Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };

      const user = await User.findById(req.user.id).select("-password");
      const book = await Book.findOne({ bookId: bookId });

      if (book) {
        if (!book.avaliability) {
          return res.status(401).json({
            msg: "This book is not available for borrowing at the given movement! Try again later",
          });
        }
        book = {
          avaliability: false,
          borrowedBy: user.id,
          borrowerName: user.name,
          borrowedCount: book.borrowedCount + 1,
          borrowStartDate: date.getTime(),
          borrowEndDate: date.addDays(duration),
        };

        book.save();

        res.json(book);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// search for books

router.post(
  "/search",
  [[check("search", "Please enter somthing!").notEmpty()], auth],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    try {
      let search = req.body.search;
      let page = req.body.page;

      page = page * 20;

      global.temp = "";

      const request = https.request(
        {
          host: "www.googleapis.com",
          path: `/books/v1/volumes?q=${search}&key=AIzaSyBB-72oIaeYGiiKxGLvnsznDJvMfXaGNRo&maxResults=20&startIndex=${page}&fields=totalItems,items(id,volumeInfo(title,subtitle,authors,publishedDate,description,pageCount,imageLinks(thumbnail),averageRating))`,
          method: "GET",
        },
        function (response) {
          response.setEncoding("utf8");
          response.on("data", (chunk) => {
            temp += chunk;
          });
        }
      );
      request.end();

      setTimeout(() => {
        try {
          const books = JSON.parse(temp);
          if (!books || books.totalItems === 0) {
            return res.status(400).json({
              msg: "No book was found! Try again",
            });
          }
          res.json(books);
        } catch (error) {
          console.log(error);
        }
      }, 2000);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
