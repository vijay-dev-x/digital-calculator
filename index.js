const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const port = 3002;
const atlasUrl =
  "mongodb+srv://vtf4592:Rd%401122334455@cluster0.i0swkwz.mongodb.net/lists";

mongoose
  .connect(atlasUrl)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log("error", err);
  });

const numScema = new mongoose.Schema({
  num1: { type: Number, required: true },
  num2: { type: Number, required: true },
  sum: { type: Number, required: true },
});

const numModel = mongoose.model("nums", numScema);

// middleware
app.use(express.json());

// hello route

app.get("/", (req, res) => {
  res.send("Hello");
});
// connect to mongoose--

// Sum route--
app.get("/sum", (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).send("Both query parameters must be valid numbers.");
  }

  const sum = num1 + num2;

  res.send(`The sum of ${num1} and ${num2} is ${sum}`);
});
// Sum post route--
app.post("/sum", async (req, res) => {
  const num1 = req.body.num1;
  const num2 = req.body.num2;

  if (
    typeof num1 !== "number" ||
    typeof num2 !== "number" ||
    isNaN(num1) ||
    isNaN(num2)
  ) {
    return res.status(400).send("Both body parameters must be valid numbers.");
  }

  const sum = num1 + num2;

  const newNum = new numModel({
    num1: num1,
    num2: num2,
    sum: sum,
  });
  const saveNum = await newNum.save();

  res.json({
    msg: `The sum of ${num1} and ${num2} is ${sum}`,
    value: sum,
    savedToDB: saveNum,
  });
});
//   listen--

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
