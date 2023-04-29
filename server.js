const express = require("express");
const app = express();
const port = 8080;
const connectDb = require("./config/db");

connectDb();

app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});
