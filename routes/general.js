const express = require("express");
const config = require("config");
const transporter = require("../config/transporter");
const router = express.Router();
const { check, validationResult } = require("express-validator");

router.post(
  "/selfmail",
  [
    check("name", "Please enter a name").not().isEmpty(),
    check("email", "Please enter a valid email")
      .isEmail()
      .contains("@mechyd.ac.in"),
    check("subject", "Please enter the subject of the message").not().isEmpty(),
    check("message", "Please enter a message to send").not().isEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;

    const mailData = {
      from: config.get("appMailId"), // sender address
      to: config.get("appMailId"), // list of receivers
      subject: `REPORT: ${subject}`,
      text: "That was easy!",
      html: `name: ${name} <br><br>email: ${email}<br><br>message: ${message}`,
    };

    transporter.sendMail(mailData, (err, data) => {
      if (err) {
        const error = [{ msg: err.message }];
        return res.status(400).json({
          errors: error,
        });
      }
      res.status(200).json({
        msg: "Mail sent!",
      });
    });
  }
);

module.exports = router;
