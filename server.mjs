import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import open from "open";
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

  console.clear();
  console.log("🌿 MongoDB connected!");
  console.log(
    `🍿 ${await movies.countDocuments({})} movies & ${await tv.countDocuments(
      {}
    )} TV series found!`
  );
} catch (e) {
  console.error(e);
}

let db = conn.db(process.env.MONGODB);
let movies = db.collection("movies");
let tv = db.collection("tv");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send(
    "<div style='text-align:center'><a href='/movies'>MOVIES</a> / <a href='/tv'>SERIES</a></div>"
  );
});

// movies
app.get("/movies", async (req, res) => {
  let results = await movies.find({}).limit(20).toArray();
  res.send(results).status(200);
});

app.get("/movies/filter", async (req, res) => {
  let query = { id: req.query.id };
  let result = await movies.findOne(query);

  if (!result) res.send("Not found").status(404);
  res.send(result).status(200);
});

// tv
app.get("/tv", async (req, res) => {
  let results = await tv.find({}).limit(500).toArray();
  res.send(results).status(200);
});

app.get("/tv/filter", async (req, res) => {
  let query = { id: JSON.parse(req.query.id) };
  let result = await tv.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

app.listen(port, () => {
  console.log(`🚀 Web server listening on port ${port}`);
  open(`http://localhost:${port}`);
});
