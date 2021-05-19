const express = require("express");
const connectDB = require("./config/db");
const path = require("path")
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

// DEFINE ROUTES

app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));
app.use("/api/post", require("./routes/post"));
app.use("/api/library", require("./routes/library"));
app.use("/api/timetable", require("./routes/timetable"));

if(process.env.NODE_ENV === 'production'){
  app.use(express.static("client/build"))

  app.get('*',(req,res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
