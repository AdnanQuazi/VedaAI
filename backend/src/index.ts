import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db";
import { redisConnection } from "./config/redis";
import assignmentRoutes from "./routes/assignments.routes";
import "./workers/generator.worker";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

app.get("/", (_, res) => {
  res.send("Backend running");
});

app.use("/api/assignments", assignmentRoutes);

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();

    // initialize redis connection
    redisConnection;

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
