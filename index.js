const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const userModel = "./models/userModel.js";
const bodyParser = require("body-parser");
const userRoute = require("./routes/userRoute.js");
const cors = require("cors");

// -------
const port = 3005;

// mongo---
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

// middleware
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/user", userRoute);
app.use(cors()); // Enable CORS for all routes

// hello route

app.get("/", (req, res) => {
  res.send("Hello");
});
// Error-Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "An unexpected error occurred!" });
});

// connect to mongoose--

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
