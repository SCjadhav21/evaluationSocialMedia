const express = require("express");
const app = express();
const { PostModel } = require("../Model/post.model");
const { Authentication } = require("../Middelware/authentication");
app.use(express.json());

const PostRoutes = express.Router();
PostRoutes.use(Authentication);

PostRoutes.get("/", async (req, res) => {
  const registered_userId = req.body.userId;
  const device = req.query.device;
  try {
    let posts;
    if (device == "MOBILE" || device == "PC" || device == "TABLET") {
      posts = await PostModel.find({
        userId: registered_userId,
        device: device,
      });
    } else {
      posts = await PostModel.find({ userId: registered_userId });
    }

    res.send({
      msg: "post found",
      alert: "post getting sucessfully",
      data: posts,
    });
  } catch (err) {
    res.send({ msg: err, alert: "Something went wrong" });
  }
});

PostRoutes.post("/create", async (req, res) => {
  const { title, body, device } = req.body;
  try {
    if (device == "MOBILE" || device == "PC" || device == "TABLET") {
      const newpost = await new PostModel(req.body);
      newpost.save();
      res.send({
        msg: "post created succesfuly",
        alert: "post added successfully",
      });
    } else {
      res.send({
        msg: "not able to post",
        alert: "Add only 'PC' or 'MOBILE' or 'TABLET' in devide category",
      });
    }
  } catch (err) {
    res.send({ msg: err, alert: "Something went wrong" });
  }
});

PostRoutes.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  try {
    const newpost = await PostModel.findOneAndUpdate(
      { _id: id },
      { ...payload }
    );

    res.send({ msg: "updated", alert: "Status updated successfully" });
  } catch (err) {
    res.send({ msg: err.message, alert: "Something went wrong" });
  }
});

PostRoutes.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await PostModel.findOneAndDelete({ _id: id });
    res.send({ msg: "deleted", alert: "post deleted successfully" });
  } catch (err) {
    res.send({ msg: err, alert: "Something went wrong" });
  }
});
module.exports = { PostRoutes };
