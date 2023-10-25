import express from "express";
import { config } from "dotenv";
import cors from "cors";
import connectDB from "./config/dbConnection.js";

config();

const app = express();

connectDB();
app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.listen(PORT, console.log(`Server running on port ${PORT}`)); // listen to port

export default app;
