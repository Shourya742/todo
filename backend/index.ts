import express from "express";
import mongoose from "mongoose";
require("dotenv").config();
import cors from "cors";
import authRoutes from "./routes/auth";
import todoRoutes from "./routes/auth";
const PORT = process.env.PORT;
const mongooseConnection: any = process.env.MONGO_URL;

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
