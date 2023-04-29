const express = require("express");
require("dotenv").config();
const { MongoClient } = require("mongodb");
const app = express();
const appPort = 8080;
const dbUrl = `mongodb+srv://tb:${process.env.MONGODB_PASS}@sweep-api.7o5uwy1.mongodb.net/?retryWrites=true&w=majority`;
const dbName = "sweep";

async function main() {
  const client = new MongoClient(dbUrl);

  try {
    await client.connect();
    await client.db(dbName).command({ ping: 1 });
    console.log("You successfully connected to MongoDB!");
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

app.listen(appPort, () => {
  console.log(`Server listening on port ${appPort}`);
});