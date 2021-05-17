const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Book = require("../models/Book");
const User = require("../models/User");
var https = require("https");
var LocalStorage = require("node-localstorage").LocalStorage;
const { check, validationResult } = require("express-validator");

localStorage = new LocalStorage("./scratch");

// borrow a book 

router.post("/borrow/:id", [
  [
    check("duration", "Please enter a duration in between 0 and 14 days!").notEmpty().isInt({ min:0, max: 14}),
    check("search", "Please enter somthing!").notEmpty(),
  ],
  auth,
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    let bookId = req.params.id;
    let duration = req.body.duration;
    let search = req.body.search;
    let page = req.body.page;

    page = page*40

    const user = await User.findById(req.user.id).select("-password");

    const request = https.request(
      {
        host: "www.googleapis.com",
        path: `/books/v1/volumes?q=${search}&key=AIzaSyBB-72oIaeYGiiKxGLvnsznDJvMfXaGNRo&maxResults=20&startIndex=${page}`,
        method: "GET",
      },
      function (response) {
        var value = "";
        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          value += chunk;
        });
        response.on("end", () => {
          localStorage.setItem("book_data", value);
        });
      }
    );
    request.end();

    const books = JSON.parse(localStorage.getItem("book_data")).items;
    localStorage.removeItem("book_data");

    var found = false;
    var book = null;

    books.forEach((i) => {
      if (i.id === bookId) {
        found = true;
        book = i;
        return;
      }
    });

    if (!found) {
      return res.status(400).json({
        msg: "Book not found! Try again",
      });
    }

    let borrowInfo = await Book.findOne({ bookId: book.id });

    Date.prototype.addDays = function(days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    }
  
    var date = new Date();  

    if (borrowInfo) {
      if (!borrowInfo.avaliability) {
        return res.status(401).json({
          msg: "This book is not available for borrowing at the given movement! Try again later",
        });
      } else {
        borrowInfo = {
          avaliability: false,
          borrowedBy: user.id,
          borrowerName: user.name,
          borrowStartDate: date.getTime(),
          borrowEndDate: date.addDays(duration)
        }
      }
    } else {
      borrowInfo = new Book({
        bookId: book.id,
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors,
        publisher: book.volumeInfo.publisher,
        publishedDate: book.volumeInfo.publishedDate,
        description: book.volumeInfo.description,
        pageCount: book.volumeInfo.pageCount,
        averageRating: book.volumeInfo.averageRating,
        bookImage: book.volumeInfo.imageLinks.thumbnail,
        avaliability: false,
        borrowedBy: user.id,
        borrowerName: user.name,
        borrowStartDate: date.getTime(),
        borrowEndDate: date.addDays(duration)
      })

      borrowInfo.save()
    }

    res.json(borrowInfo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// search for books 


router.post("/search", [
  [
    check("search", "Please enter somthing!").notEmpty(),
  ],
  auth,
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    let search = req.body.search;
    let page = req.body.page;

    const request = https.request(
      {
        host: "www.googleapis.com",
        path: `/books/v1/volumes?q=${search}&key=AIzaSyBB-72oIaeYGiiKxGLvnsznDJvMfXaGNRo&maxResults=20&startIndex=${page}`,
        method: "GET",
      },
      function (response) {
        var value = "";
        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          value += chunk;
        });
        response.on("end", () => {
          localStorage.setItem("book_data", value);
        });
      }
    );
    request.end();

    const books = JSON.parse(localStorage.getItem("book_data")).items;
    localStorage.removeItem("book_data");

    if (!books) {
      return res.status(400).json({
        msg: "No book not found! Try again",
      });
    }

    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;