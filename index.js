const express = require("express");
require("dotenv").config();
const { MongoClient } = require("mongodb");
const app = express();
const appPort = 8080;
const dbUrl = `mongodb+srv://tb:${process.env.MONGODB_PASS}@sweep-api.7o5uwy1.mongodb.net/?retryWrites=true&w=majority`;

async function main() {
  const client = new MongoClient(dbUrl);
  const db = client.db("sweep");
  const movies = db.collection("movies");

  try {
    const cursor = movies.find();

    if ((await movies.countDocuments()) === 0) {
      console.log("No documents found!");
    }

    await cursor.forEach(console.dir);

  } finally {
    await client.close();
  }
}

main().catch(console.error);

app.listen(appPort, () => {
  console.log(`Server listening on port ${appPort}`);
});
