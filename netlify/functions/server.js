const express = require("express");
const serverless = require("serverless-http");
const { default: mongoose } = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("../../routes/userRoute.js");

const app = express();

// MongoDB connection string
const atlasUrl =
  "mongodb+srv://vtf4592:Rd%401122334455@cluster0.i0swkwz.mongodb.net/lists";

mongoose
  .connect(atlasUrl)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log("error-", err);
  });

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use("/api/user", userRoute);

// Hello route
app.get("/", (req, res) => {
  res.send("Hello");
});

// Error-Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "An unexpected error occurred!" });
});

// Export the serverless handler
module.exports.handler = serverless(app);
