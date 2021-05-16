const express = require("express");
const connectDB = require("./config/db");
const app = express();
var cors = require("cors");

// DB CONNECTION
connectDB();

// MIDDLEWARE INIT

app.use(cors());

app.use(
  express.json({
    extented: false,
  })
);

app.get("/", (req, res) =>
  res.json({
    msg: "Welcome to the StudentPortal API",
  })
);

// DEFINE ROUTES

app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/user"));
app.use("/post", require("./routes/post"));
app.use("/library", require("./routes/library"));
app.use("/timetable", require("./routes/timetable"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
