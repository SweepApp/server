const express = require("express");
const app = express();
const port = 8080;
const connectDB = require("./config/db");

connectDB();

app.listen(port, () => {
  console.log(`🚀 Web server listening on port ${port}`);
});
