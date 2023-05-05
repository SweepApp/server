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
  let apiQuery = req.query.api_key;
  if (apiQuery === process.env.API_KEY) {
    if (req.query.id === undefined) {
      let data = await movies.find({}).limit(20).toArray();
      res.send(data).status(200);
    } else {
      let id = { id: req.query.id };
      let data = await movies.findOne(id);

      if (data === null) {
        res.send({ status: "Invalid ID: What you are looking for doesn't exist."}).status(404);
      } else {
        res.send(data).status(200);
      }
    }
  } else {
    res.send({ status: "Invalid API key: You must be granted a valid key."}).status(404);
  }
});

app.get("/tv", async (req, res) => {
  let apiQuery = req.query.api_key;
  if (apiQuery === process.env.API_KEY) {
    if (req.query.id === undefined) {
      let data = await tv.find({}).limit(20).toArray();
      res.send(data).status(200);
    } else {
      let id = { id: JSON.parse(req.query.id) };
      let data = await tv.findOne(id);
      
      if (data === null) {
        res.send({ status: "Invalid ID: What you are looking for doesn't exist."}).status(404);
      } else {
        res.send(data).status(200);
      }
    }
  } else {
    res.send({ status: "Invalid API key: You must be granted a valid key."}).status(404);
  }
});

app.listen(port, () => {
  console.log(`🚀 Web server listening on port ${port}`);
  open(`http://localhost:${port}`);
});
