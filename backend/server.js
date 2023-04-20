const express = require("express");
const bodyParser = require("body-parser");
const connectDb = require("./config/config");
const User = require("./model/User");
const cors = require("cors");
//connection to database
connectDb();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("<h1>WELCOM</h1>");
});

app.get("/getData", async (req, res) => {
  const data = await User.find({});
  res.json(data);
});

app.post("/postData", async (req, res) => {
  const data = await User.create(req.body);
  if (data) {
    res.status(200).json("User Added Successfullt");
  } else {
    res.status(401).json("Something Went Wrong");
  }
});

app.post("/deleteData", async (req, res) => {
  var id = req.body.id;
  const data = await User.deleteOne({ _id: id });
  if (data) {
    res.status(200).json("User Deleted");
  } else {
    res.status(401).json("Something Went Wrong");
  }
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
