const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT;
const mongooseConnection = process.env.MONGO_URL;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  mongoose.connect(mongooseConnection);
  console.log("The server is currently listening on PORT: " + PORT);
});
