require("dotenv").config();
const mongoose = require("mongoose");

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Anshul_ojha:Luhsna@atlascluster.ekt7t1o.mongodb.net/Authentication",
      { useNewUrlParser: true }
    );
    console.log("Mongo connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectToMongoDB;
