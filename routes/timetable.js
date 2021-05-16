const express = require("express");
const router = express.Router()

router.get("/", (req, res) => {
  res.send("get all events");
});

router.post("/", (req, res) => {
  res.send("add a custom event");
});

module.exports = router;
