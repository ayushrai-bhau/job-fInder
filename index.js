const express = require("express");
const mongoose = require("mongoose");
const auth = require('./routes/auth')

const app = express();
require("dotenv").config();

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;

app.use(express.json())

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("bd coonected"))
  .catch((err) => console.log(err));

app.use("/api/v1/auth",auth)

app.get("/api/health", (req, res) => {
  res.json({
      service: "Job Listing Backend API Server",
      status: "true",
      time: new Date(),
  });
});

app.listen(PORT, () => {
  console.log(`Backend Server running on http://${HOST}:${PORT}`);
});
