const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const appPort = 8080;
const dbUrl = 'mongodb://localhost:27017';
const dbName = 'Sweep';

MongoClient.connect(dbUrl, function(err, client) {
  console.log("Connecté à MongoDB");
  const db = client.db(dbName);
  client.close();
});

app.listen(appPort, () => {
  console.log(`Server listening on port ${port}`)
})

