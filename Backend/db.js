const mongoose = require("mongoose");

async function connectToMongo() {
  try {
    const client = await mongoose.connect(
      "mongodb://localhost:27017/ReadWriteHub"
    );
    console.log("Connected to mongoDB Successfully");
  } catch (error) {
    console.log("Error Connectiong to Mongo..");
  }
}

module.exports = connectToMongo;
