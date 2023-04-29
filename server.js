const express = require("express");
const app = express();
const port = 8080;
const connectDb = require("./config/db");

connectDb();

app.listen(port, () => {
  console.log(`🚀 Web server listening on port ${port}`);
});
