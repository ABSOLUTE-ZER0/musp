const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })

    console.log("Successfully conntected to the DB");
  } catch (error) {
    console.log(error.message);
    process.exit(1)
  }
}


module.exports = connectDB