import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = 8080;

const dbUrl = process.env.MONGODB_URL;
const client = new MongoClient(dbUrl);
let conn;

try {
  conn = await client.connect();
  const db = client.db(process.env.MONGODB);
  const movies = db.collection("movies");
  const tv = db.collection("tv");

  console.log('🌿 MongoDB connected!')
  console.log(`🍿 ${await movies.countDocuments({})} movies & ${await tv.countDocuments({})} TV series found!`);

} catch(e) {
  console.error(e);
}

let db = conn.db(process.env.MONGODB);

app.get("/movies", async (req, res) => {
  let movies = await db.collection("movies");
  let results = await movies.find({})
    .limit(500)
    .toArray();

  res.send(results).status(200);
});

app.get("/movies/:id", async (req, res) => {;
  let movies = await db.collection("movies");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await movies.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

app.get("/tv", async (req, res) => {
  let tv = await db.collection("tv");
  let results = await tv.find({})
    .limit(500)
    .toArray();

  res.send(results).status(200);
});

app.get("/tv/:id", async (req, res) => {;
  let tv = await db.collection("tv");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await tv.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});


app.listen(port, () => {
  console.log(`🚀 Web server listening on port ${port}`);
});
