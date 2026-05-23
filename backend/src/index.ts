import express from "express";

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (_, res) => {
  res.send("Backend running");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});