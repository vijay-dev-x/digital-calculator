const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const userRoute = require("./routes/userRoute.js");
const cors = require("cors");
require("dotenv").config();

// mongo---

mongoose
  .connect(process.env.ATLAS_URL)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log("error-", err);
  });

// middleware
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/user", userRoute);
app.use(cors()); // Enable CORS for all routes

// hello route

app.get("/", (req, res) => {
  res.send("Hello 2");
});
// Error-Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "An unexpected error occurred!" });
});

// connect to mongoose--

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
