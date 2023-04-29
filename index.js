const express = require('express');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const appPort = 8080;
const dbUrl = `mongodb+srv://tb:${process.env.MONGODB_PASS}@sweep-api.7o5uwy1.mongodb.net/?retryWrites=true&w=majority`;
const dbName = 'sweep';

MongoClient.connect(dbUrl, function(err, client) {
  console.log("Connected to MongoDB");
  const db = client.db(dbName).command({ ping: 1 });
  client.close();
});

app.listen(appPort, () => {
  console.log(`Server listening on port ${appPort}`)
})