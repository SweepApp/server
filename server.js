import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import logSymbols from "log-symbols";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import "dotenv/config";
import open from "open";
const app = express();
const port = 8080;
import { TV } from "./models/tv.js";
import { Movie } from "./models/movie.js";

const database = process.env.MONGODB_URL;

try {
  mongoose
  .connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log(logSymbols.success, "Connected to MongoDB");
    console.log(logSymbols.info, `${await Movie.countDocuments()} movies & ${await TV.countDocuments()} TV series found!`);
  })
} catch (e) {
  console.error(e);
}

let pageLimit = 20;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/movies", async (req, res) => {
  let apiQuery = req.query.api_key;
  if (apiQuery === process.env.API_KEY) {
    let noteQuery = req.query.note;
    if (req.query.id === undefined) {
      let pageQuery = req.query.page;
      if (noteQuery) {
        let note = { vote_average: { $gte: req.query.note} };
        let data = await Movie.find(note).limit(pageLimit).skip(pageLimit * pageQuery).exec();
        res.send(data).status(200);
      } else {
        let data = await Movie.find({}).limit(pageLimit).skip(pageLimit * pageQuery).exec();
        res.send(data).status(200);
      }
    } else {
      let id = { id: req.query.id };
      let data = await Movie.findOne(id);

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
    let noteQuery = req.query.note;
    if (req.query.id === undefined) {
      let pageQuery = req.query.page;
      if (noteQuery) {
        let note = { popularity: { $gte: req.query.note } };
        let data = await TV
          .find(note)
          .limit(pageLimit)
          .skip(pageLimit * pageQuery)
          .exec();
        res.send(data).status(200);
      } else {
        let data = await TV
          .find({})
          .limit(pageLimit)
          .skip(pageLimit * pageQuery)
          .exec();
        res.send(data).status(200);
      }
    } else {
      let id = { id: JSON.parse(req.query.id) };
      let data = await TV.findOne(id);

      if (data === null) {
        res
          .send({
            status: "Invalid ID: What you are looking for doesn't exist.",
          })
          .status(404);
      } else {
        res.send(data).status(200);
      }
    }
  } else {
    res
      .send({ status: "Invalid API key: You must be granted a valid key." })
      .status(404);
  }
});

app.listen(port, () => {
  console.log(`${logSymbols.success} Web server listening on port ${port}`);
  open(`http://localhost:${port}`);
});
