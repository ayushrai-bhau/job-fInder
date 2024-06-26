const express = require("express");
const mongoose = require("mongoose");
const auth = require('./routes/auth')
const job = require("./routes/job");
const errorHander = require("./middleware/errorHandler");
const cookieParser = require('cookie-parser')
const cors = require('cors')



const app = express();
require("dotenv").config();

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;
app.use(cors())

app.use(express.json())
app.use(cookieParser())


mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("bd coonected"))
  .catch((err) => console.log(err));




app.use("/api/v1/auth",auth)
app.use("/api/v1/job",job)


app.use("/",(req,res)=>{
  res.status(200).json({"status":"success running"})
})
app.use(errorHander)

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
