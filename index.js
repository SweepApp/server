const express = require("express");
require("dotenv").config();
const { MongoClient } = require("mongodb");
const app = express();
const appPort = 8080;
const dbUrl = process.env.MONGODB;

async function main() {
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

main().catch(console.error);

app.listen(appPort, () => {
  console.log(`Server listening on port ${appPort}`);
});
