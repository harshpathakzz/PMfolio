import express from "express";
import { config } from "dotenv";
import cors from "cors";
import connectDB from "./config/dbConnection.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import caseStudiesRoutes from "./routes/caseStudyRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

config();

const app = express();

connectDB();
app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/case-studies", caseStudiesRoutes);
app.use("/api/v1/comment", commentRoutes);

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.listen(PORT, console.log(`Server running on port ${PORT}`));

export default app;
