import express from "express";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to the Subscription Tracker API!");
});

app.listen(port, () => {
  console.log(`Subscription Tracker API listening on http://localhost:${port}`);
});

export default app;
