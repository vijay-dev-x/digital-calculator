const express = require("express");
const app = express();
const port = 3002;
// middleware
app.use(express.json());

// hello route

app.get("/", (req, res) => {
  res.send("Hello");
});
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
app.post("/sum", (req, res) => {
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

  res.json({ msg: `The sum of ${num1} and ${num2} is ${sum}`, value: sum });
});
//   listen--

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
