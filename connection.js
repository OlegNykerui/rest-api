const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.set("strictQuery", false);

const { MONGO_URL } = process.env;

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Database connection successful");
  } catch (error) {
    console.log("error while connecting to MongoDB", error.message);
    process.exit(1);
  }
}

main();
