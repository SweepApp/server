const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const swaggerUi = require('swagger-ui-express')
const cors = require("cors");
const yaml = require('yamljs')
const swaggerDocs = yaml.load('./swagger.yaml')
const userRoutes = require("./routes/userRoutes.js");
dotenv.config();

const port = 8080;
const app = express();

const { TV } = require("./models/tv.js");
const { Movie } = require("./models/movie.js");

const database = process.env.MONGODB_URL;

try {
  mongoose
    .connect(database, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async () => {
      console.log("Connected to MongoDB");
      console.log(
        `${await Movie.countDocuments()} movies & ${await TV.countDocuments()} TV series found!`
      );
    });
} catch (e) {
  console.error(e);
}

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', express.static('public'));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/v1/user", userRoutes);

let pageLimit = 20;

app.get("/movies", async (req, res) => {
  let apiQuery = req.query.api_key;
  if (apiQuery === process.env.API_KEY) {
    let noteQuery = req.query.note;
    if (req.query.id === undefined) {
      let pageQuery = req.query.page;
      if (noteQuery) {
        let note = { vote_average: { $gte: req.query.note } };
        let data = await Movie.find(note)
          .limit(pageLimit)
          .skip(pageLimit * pageQuery)
          .exec();
        res.send(data).status(200);
      } else {
        let data = await Movie.find({})
          .limit(pageLimit)
          .skip(pageLimit * pageQuery)
          .exec();
        res.send(data).status(200);
      }
    } else {
      let id = { id: req.query.id };
      let data = await Movie.findOne(id);

      if (data === null) {
        res
          .send({ status: "Invalid ID: What you are looking for doesn't exist." })
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

app.get("/tv", async (req, res) => {
  let apiQuery = req.query.api_key;
  if (apiQuery === process.env.API_KEY) {
    let noteQuery = req.query.note;
    if (req.query.id === undefined) {
      let pageQuery = req.query.page;
      if (noteQuery) {
        let note = { popularity: { $gte: req.query.note } };
        let data = await TV.find(note)
          .limit(pageLimit)
          .skip(pageLimit * pageQuery)
          .exec();
        res.send(data).status(200);
      } else {
        let data = await TV.find({})
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
          .send({ status: "Invalid ID: What you are looking for doesn't exist." })
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
  console.log(`Web server listening on port ${port}`);
});
