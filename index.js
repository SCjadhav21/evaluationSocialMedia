const express = require("express");
require("dotenv").config();
const cors = require("cors");

const { connection } = require("./Config/db");
const { UserRoutes } = require("./Routes/user.routes");
const { PostRoutes } = require("./Routes/post.routes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", UserRoutes, (req, res) => {
  res.send(404);
});
app.use("/posts", PostRoutes, (req, res) => {
  res.send(404);
});

app.listen(process.env.port, async () => {
  try {
    connection;
    console.log(`running on port ${process.env.port}`);
  } catch (err) {
    console.log("Error: cant connect to mongodb");
  }
});
