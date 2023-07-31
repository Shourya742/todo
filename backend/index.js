const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/auth");
const PORT = process.env.PORT;
const mongooseConnection = process.env.MONGO_URL;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);
app.listen(PORT, () => {
  mongoose.connect(mongooseConnection);
  console.log("The server is currently listening on PORT: " + PORT);
});
