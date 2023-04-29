require("dotenv").config();
const { MongoClient } = require("mongodb");
const dbUrl = process.env.MONGODB;

const connectDB = async () => {
  const client = new MongoClient(dbUrl);
  const db = client.db("sweep");
  const movies = db.collection("movies");
  const tv = db.collection("tv");

  try {
    if ((await movies.countDocuments()) === 0) {
      console.log("No movies found!");
    } else {
      console.log(`${await movies.countDocuments({})} movies found!`);
    }

    if ((await tv.countDocuments()) === 0) {
      console.log("No TV series found!");
    } else {
      console.log(`${await tv.countDocuments({})} TV series found!`);
    }
  } finally {
    await client.close();
  }
}

module.exports = connectDB;
