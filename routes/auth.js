const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const auth = require("../middleware/auth");
const transporter = require("../config/transporter");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const { JsonWebTokenError } = require("jsonwebtoken");

// GET ROUTE

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Even though password is encrypted sending it in a responce is a bad idea so we are removing it
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// POST ROUTE

router.post(
  "/",
  [
    check("email", "Please enter a valid email")
      .isEmail()
      .contains("@mechyd.ac.in"),
    check("password", "Please enter the password").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({
        email,
      });

      if (!user) {
        const error = [{ msg: "Invalid Crendentials" }];
        return res.status(400).json({
          errors: error,
        });
      }

      const passwordCheck = await bcrypt.compare(password, user.password);

      if (!passwordCheck) {
        const error = [{ msg: "Invalid Crendentials" }];
        return res.status(400).json({
          errors: error,
        });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 1440,
        },
        async (err, token) => {
          if (err) throw err;
          res.json({
            token,
          });
          user.token = token;
          user.isOnline = true;
          await user.save();
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// logout user

router.post("/logout", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Even though password is encrypted sending it in a responce is a bad idea so we are removing it

    if (!user) {
      const error = [{ msg: "User doesn't exists" }];
      return res.status(400).json({
        errors: error,
      });
    }

    user.token = null;
    user.isOnline = false;

    console.log(user.name);
    await user.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// set login

router.get("/login", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Even though password is encrypted sending it in a responce is a bad idea so we are removing it

    if (!user) {
      const error = [{ msg: "User doesn't exists" }];
      return res.status(400).json({
        errors: error,
      });
    }

    user.checkOnline = false;
    user.isOnline = true;
    console.log(user.isOnline);
    await user.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// forgot password send mail

router.post(
  "/forgot",
  [
    check("email", "Please enter a valid email to reset your password")
      .isEmail()
      .contains("@mechyd.ac.in"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email } = req.body;

    try {
      let user = await User.findOne({
        email,
      });

      if (!user) {
        const error = [{ msg: "User doesn't exists" }];
        return res.status(400).json({
          errors: error,
        });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      global.token = "";

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 1440,
        },
        async (err, tok) => {
          if (err) throw err;
          token = tok;
        }
      );

      setTimeout(() => {
        let uri = "https://musp.herokuapp.com/login/forgot/" + token;

        const mailData = {
          from: config.get("appMailId"),
          to: user.email,
          subject: "Forgot password",
          text: "That was easy!",
          html: `<!DOCTYPE html><html><head><title></title><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="X-UA-Compatible" content="IE=edge" /><style type="text/css">@media screen{@font-face{font-family:'Lato';font-style:normal;font-weight:400;src:local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff')}@font-face{font-family:'Lato';font-style:normal;font-weight:700;src:local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff')}@font-face{font-family:'Lato';font-style:italic;font-weight:400;src:local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff')}@font-face{font-family:'Lato';font-style:italic;font-weight:700;src:local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff')}}body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}img{-ms-interpolation-mode:bicubic}img{border:0;height:auto;line-height:100%;outline:none;text-decoration:none}table{border-collapse:collapse !important}body{height:100% !important;margin:0 !important;padding:0 !important;width:100% !important}a[x-apple-data-detectors]{color:inherit !important;text-decoration:none !important;font-size:inherit !important;font-family:inherit !important;font-weight:inherit !important;line-height:inherit !important}@media screen and (max-width:600px){h1{font-size:32px !important;line-height:32px !important}}div[style*="margin: 16px 0;"]{margin:0 !important}</style></head><body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;"><div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> Create a new password!</div><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td bgcolor="#750fbc" align="center"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"><tr><td align="center" valign="top" style="padding: 40px 10px 40px 10px;"></td></tr></table></td></tr><tr><td bgcolor="#750fbc" align="center" style="padding: 0px 10px 0px 10px;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"><tr><td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;"><h1 style="font-size: 48px; font-weight: 400; margin: 2;">Trouble Signing in?</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;" /></td></tr></table></td></tr><tr><td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"><tr><td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;"><p style="margin: 0;">Seems like you forgot your password for MUSP. If this is true and you have requested for a password reset, click on the button below!</p></td></tr><tr><td bgcolor="#ffffff" align="left"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;"><table border="0" cellspacing="0" cellpadding="0"><tr><td align="center" style="border-radius: 3px;" bgcolor="#750fbc"><a href="${uri}" id="verify" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #750fbc; display: inline-block;">Change Password</a></td></tr></table></td></tr></table></td></tr><tr><td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;"><p style="margin: 0;">If you did not forget your password you can safely ignore this email!</p></td></tr><tr><td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;"><p style="margin: 0;">If you have any questions, just reply to this email—we're always happy to help out.</p></td></tr><tr><td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;"><p style="margin: 0;">Cheers,<br>MUSP Team</p></td></tr></table></td></tr><tr><td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"><tr><td bgcolor="#FFECD1" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;"><h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Need more help?</h2><p style="margin: 0;"><a href="https://powerful-ocean-11401.herokuapp.com/help" target="_blank" style="color: #750fbc">We&rsquo;re here to help you out</a></p></td></tr></table></td></tr></table></body></html>`,
        };

        transporter.sendMail(mailData, (err, data) => {
          if (err) {
            const error = [{ msg: err.message }];
            return res.status(400).json({
              errors: error,
            });
          }
          res.status(200).json({
            msg: "mail sent!",
          });
        });
      }, 1);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// forgot password send mail

router.post(
  "/forgot/:id",
  [check("password", "Please enter a password").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const password = req.body.password;
    const decoded = jwt.verify(req.params.id, config.get("jwtSecret"));
    const userId = decoded.user;

    try {
      let user = await User.findById(userId.id).select("-password"); // Even though password is encrypted sending it in a responce is a bad idea so we are removing it
      if (!user) {
        const error = [{ msg: "User doesn't exists" }];
        return res.status(400).json({
          errors: error,
        });
      }

      if (user.token !== req.params.id) {
        const error = [
          { msg: "Invalid token, reset link can only be used once" },
        ];
        return res.status(400).json({
          errors: error,
        });
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      user.token = null;
      await user.save();

      res.json("password changed!");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
