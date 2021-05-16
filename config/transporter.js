const nodemailer = require('nodemailer');
const config = require("config");

const user = config.get("appMailId");
const pass = config.get("appMailPassword");

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
     auth: {
          user,
          pass
       },
  secure: true,
  });

  module.exports = transporter

  