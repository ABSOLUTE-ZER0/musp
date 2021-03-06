const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const transporter = require("../config/transporter");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
var mongoose = require("mongoose");

const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const user = await User.find({}).select("-password"); // Even though password is encrypted sending it in a responce is a bad idea so we are removing it
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/",
  [
    check("name", "Please enter a name").not().isEmpty(),
    check("email", "Please enter a valid email")
      .isEmail()
      .contains("@mechyd.ac.in"),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({
        email,
      });

      if (user) {
        const error = [{ msg: "User already exists" }];
        return res.status(400).json({
          errors: error,
        });
      }

      const color = getRandomColor();
      const textColor = setColor(color);

      user = new User({
        name,
        email,
        password,
        token: null,
        color,
        textColor,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

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
          user.token = token;
          res.json({ token });
          await user.save();
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// user follow

router.post(
  "/follow",
  [auth, check("id", "Please enter a name").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { id } = req.body;

    try {
      const user = await User.findById(req.user.id).select("-password"); // Even though password is encrypted sending it in a responce is a bad idea so we are removing it
      const user2 = await User.findById(id).select("-password"); // Even though password is encrypted sending it in a responce is a bad idea so we are removing it

      if (!user2) {
        const error = [{ msg: "User does not exists" }];
        return res.status(400).json({
          errors: error,
        });
      }

      if(user._id === user2._id){
        const error = [{ msg: "Cannot follow yourself! Smart Ass" }];
        return res.status(400).json({
          errors: error,
        });      }

      if (user.following.includes(user2._id)) {
        user.following = user.following.filter((item) => item.toString() !== user2._id.toString());

        user2.followers = user2.followers.filter(
          (item) => item.toString() !== user._id.toString()
        );

        user.save();
        user2.save();
        return res.json(user.following);
      } else {
        user.following.push(user2._id);
        user2.followers.push(user._id);

        user.save();
        user2.save();

        return res.json("followed");
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.post("/verify", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Even though password is encrypted sending it in a responce is a bad idea so we are removing it

    if (!user) {
      const error = [{ msg: "User doesn't exists" }];
      return res.status(400).json({
        errors: error,
      });
    }

    if (user.verified) {
      const error = [{ msg: "This account has already been verified" }];
      return res.status(400).json({
        errors: error,
      });
    }
    const token = req.token;
    let urlVerify = config.get("apiURL") + "/user/verify/" + token;
    let urlDelete = config.get("apiURL") + "/user/delete/" + token;

    const mailData = {
      from: config.get("appMailId"), // sender address
      to: user.email, // list of receivers
      subject: "Verify your account",
      text: "That was easy!",
      html: `<!DOCTYPE html><html><head><title></title><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="X-UA-Compatible" content="IE=edge" /><style type="text/css">@media screen{@font-face{font-family:'Lato';font-style:normal;font-weight:400;src:local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff')}@font-face{font-family:'Lato';font-style:normal;font-weight:700;src:local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff')}@font-face{font-family:'Lato';font-style:italic;font-weight:400;src:local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff')}@font-face{font-family:'Lato';font-style:italic;font-weight:700;src:local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff')}}body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}img{-ms-interpolation-mode:bicubic}img{border:0;height:auto;line-height:100%;outline:none;text-decoration:none}table{border-collapse:collapse !important}body{height:100% !important;margin:0 !important;padding:0 !important;width:100% !important}a[x-apple-data-detectors]{color:inherit !important;text-decoration:none !important;font-size:inherit !important;font-family:inherit !important;font-weight:inherit !important;line-height:inherit !important}@media screen and (max-width:600px){h1{font-size:32px !important;line-height:32px !important}}div[style*="margin: 16px 0;"]{margin:0 !important}</style></head><body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;"><div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account.</div><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td bgcolor="#750fbc" align="center"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"><tr><td align="center" valign="top" style="padding: 40px 10px 40px 10px;"></td></tr></table></td></tr><tr><td bgcolor="#750fbc" align="center" style="padding: 0px 10px 0px 10px;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"><tr><td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;"><h1 style="font-size: 48px; font-weight: 400; margin: 2;">Hello there!</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;" /></td></tr></table></td></tr><tr><td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"><tr><td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;"><p style="margin: 0;">We're excited to have you get started. First, you need to confirm your account. Just press the button below.</p></td></tr><tr><td bgcolor="#ffffff" align="left"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;"><table border="0" cellspacing="0" cellpadding="0"><tr><td align="center" style="border-radius: 3px;" bgcolor="#750fbc"><a href="${urlVerify}" id="verify" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #750fbc; display: inline-block;">Verify Account</a></td></tr></table></td></tr></table></td></tr><tr><td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;"><p style="margin: 0;">If you have not registersted and wish to remove your account. Just press the button below.</p></td></tr><tr><td bgcolor="#ffffff" align="left"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;"><table border="0" cellspacing="0" cellpadding="0"><tr><td align="center" style="border-radius: 3px;" bgcolor="#bc230f"><a href="${urlDelete}" id="verify" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #bc230f; display: inline-block;">Delete Account</a></td></tr></table></td></tr></table></td></tr><tr><td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;"><p style="margin: 0;">If you have any questions, just reply to this email???we're always happy to help out.</p></td></tr><tr><td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;"><p style="margin: 0;">Cheers,<br>MUSP Team</p></td></tr></table></td></tr><tr><td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"><tr><td bgcolor="#FFECD1" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;"><h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Need more help?</h2><p style="margin: 0;"><a href="https://powerful-ocean-11401.herokuapp.com/help" target="_blank" style="color: #750fbc">We&rsquo;re here to help you out</a></p></td></tr></table></td></tr></table></body></html>`,
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
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// update user

router.post("/update/userdata", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Even though password is encrypted sending it in a responce is a bad idea so we are removing it

    if (!user) {
      const error = [{ msg: "User doesn't exists" }];
      return res.status(400).json({
        errors: error,
      });
    }

    const userdata = req.body.userdata;

    const { name, color, textColor, bio } = userdata;

    if (name === "" || color === "" || textColor === "") {
      const error = [{ msg: "Please Enter something" }];
      return res.status(400).json({
        errors: error,
      });
    }

    user.name = name;
    user.color = color;
    user.textColor = textColor;
    user.bio = bio;

    user.save();

    res.json("user updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// update password

router.post("/update/password", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Even though password is encrypted sending it in a responce is a bad idea so we are removing it

    if (!user) {
      const error = [{ msg: "User doesn't exists" }];
      return res.status(400).json({
        errors: error,
      });
    }

    const userdata = req.body.userdata;
    const { password, oldPassword } = userdata;

    if (password === "" || oldPassword === "") {
      const error = [{ msg: "Please Enter something" }];
      return res.status(400).json({
        errors: error,
      });
    }

    const passwordCheck = await bcrypt.compare(oldPassword, user.password);

    if (!passwordCheck) {
      const error = [{ msg: "Wrong password!" }];
      return res.status(400).json({
        errors: error,
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    user.save();

    res.json("password updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// send a message

router.post(
  "/message",
  [
    [
      check("id", "Please enter the recievers id").notEmpty(),
      check("message", "Please enter the message").notEmpty(),
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
      const recieverId = req.body.id;
      const bookName = req.body.bookName;
      const type = req.body.type;
      const senderId = req.user.id;

      if (senderId === recieverId) {
        const error = [{ msg: "Cannot send message to yourself!" }];
        return res.status(400).json({
          errors: error,
        });
      }
      const message = req.body.message;
      let reciever = await User.findOne({ _id: recieverId }).select(
        "-password"
      ); // Even though password is encrypted sending it in a responce is a bad idea so we are removing it
      let sender = await User.findOne({ _id: senderId }).select("-password"); // Even though password is encrypted sending it in a responce is a bad idea so we are removing it

      if (!reciever) {
        const error = [{ msg: "User doesn't exists" }];
        return res.status(400).json({
          errors: error,
        });
      }

      const notification = {
        id: mongoose.Types.ObjectId(),
        senderId,
        senderName: sender.name,
        bookName,
        message,
        type,
        date: Date(),
        read: false,
      };

      reciever.notifications.push(notification);

      reciever.save();

      res.json(reciever.notifications);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// message read

router.post(
  "/message/read/:id",
  [[check("id", "Please enter the message id").notEmpty()], auth],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    try {
      const id = req.user.id;
      const notificationid = req.params.id;

      let user = await User.findOne({ _id: id }).select("-password"); // Even though password is encrypted sending it in a responce is a bad idea so we are removing it

      if (!user) {
        const error = [{ msg: "User doesn't exists" }];
        return res.status(400).json({
          errors: error,
        });
      }

      user.notifications.forEach((notification, i) => {
        if (notification.id == notificationid) {
          user.notifications[i].read = true;
          user.notifications[i].senderName = user.notifications[i].senderName;
        }
      });

      user.markModified(`notifications`);
      await user.save();

      res.json(user.notifications);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// delete message

router.post(
  "/message/delete/:id",
  [[check("id", "Please enter the message id").notEmpty()], auth],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    try {
      const id = req.user.id;
      const notificationid = req.params.id;

      let user = await User.findOne({ _id: id }).select("-password"); // Even though password is encrypted sending it in a responce is a bad idea so we are removing it

      if (!user) {
        const error = [{ msg: "User doesn't exists" }];
        return res.status(400).json({
          errors: error,
        });
      }

      user.notifications = user.notifications.filter(
        (notification) => notification.id != notificationid
      );

      user.save();

      res.json(user.notifications);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// verify user

router.get("/verify/:id", async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.id, config.get("jwtSecret"));

    const userId = decoded.user;
    const user = await User.findById(userId.id).select("-password"); // Even though password is encrypted sending it in a responce is a bad idea so we are removing it
    if (!user) {
      const error = [{ msg: "User doesn't exists" }];
      return res.status(400).json({
        errors: error,
      });
    }
    user.verified = true;

    user.save();
    res.redirect("https://musp.herokuapp.com/");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// delete user

router.get("/delete/:id", async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.id, config.get("jwtSecret"));

    const userId = decoded.user;
    const user = await User.findById(userId.id).select("-password"); // Even though password is encrypted sending it in a responce is a bad idea so we are removing it

    if (!user) {
      const error = [{ msg: "User does not exists" }];
      return res.status(400).json({
        errors: error,
      });
    }

    await user.delete();
    res.json("User successfully deleted!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// get user by id

router.get("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // Even though password is encrypted sending it in a responce is a bad idea so we are removing it

    if (!user) {
      const error = [{ msg: "User doesn't exists" }];
      return res.status(400).json({
        errors: error,
      });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// get user by id

router.get("/basic/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("name color textColor isOnline"); // Even though password is encrypted sending it in a responce is a bad idea so we are removing it

    if (!user) {
      const error = [{ msg: "User doesn't exists" }];
      return res.status(400).json({
        errors: error,
      });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// get user by id for follow

router.get("/basicFollow/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("name email lastOnline isOnline"); // Even though password is encrypted sending it in a responce is a bad idea so we are removing it

    if (!user) {
      const error = [{ msg: "User doesn't exists" }];
      return res.status(400).json({
        errors: error,
      });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color != "#FFFFFF" ? color : getRandomColor();
}

function setColor(color) {
  let r,
    g,
    b = 0;
  if (color.match(/^rgb/)) {
    // If HEX --> store the red, green, blue values in separate variables
    color = color.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
    );

    r = color[1];
    g = color[2];
    b = color[3];
  } else {
    // If RGB --> Convert it to HEX: http://gist.github.com/983661
    color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&"));

    r = color >> 16;
    g = (color >> 8) & 255;
    b = color & 255;
  }

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  let hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  // Using the HSP value, determine whether the color is light or dark
  if (hsp > 127.5) {
    return "#000";
  } else {
    return "#fff";
  }
}

module.exports = router;
