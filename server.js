const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const app = express();
var cors = require("cors");
const User = require("./models/User");

// DB CONNECTION
connectDB();

// MIDDLEWARE INIT

app.use(cors());

app.use(
  express.json({
    extented: false,
  })
);

// check user online status, set online checker

var minutes = 2,
  the_interval = minutes * 60 * 1000;
setInterval(async function () {
  try {
    const users = await User.find({}).select("-password"); // Even though password is encrypted sending it in a responce is a bad idea so we are removing it
    users.forEach((user, i) => {
      (users[i].checkOnline = true), users[i].save();
    });

    console.log("set online checker");

    // check user online status, set online status

    setTimeout(async() => {
      try {
        const users = await User.find({}).select("-password"); // Even though password is encrypted sending it in a responce is a bad idea so we are removing it
        users.forEach((user, i) => {
          if (user.checkOnline === true) {
            users[i].isOnline = false;
            users[i].save();
          }
          console.log("set online");
        });
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    }, 1 * 60 * 1000);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}, the_interval);

// DEFINE ROUTES

app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));
app.use("/api/post", require("./routes/post"));
app.use("/api/library", require("./routes/library"));
app.use("/api/general", require("./routes/general"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
