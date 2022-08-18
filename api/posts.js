const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const auth = require("../middleware/auth");
const { deleteOne } = require("../models/User");

//Add post localhost:3000/posts
router.post("/", auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    let post = new Post({
      title,
      description,
      author: req.user._id,
      userName: req.user.name,
    });
    post.save();
    return res.json({ msg: "Post added successfully" });
  } catch (e) {
    return res.status(400).json({ e, msg: "Cannot add post" });
  }
});

//Get all posts localhost:3000/posts
router.get("/", async (req, res) => {
  try {
    let posts = await Post.find({});
    if (!posts.length)
      return res.json({
        msg: "No posts found",
      });
    return res.json(posts);
  } catch (e) {
    return res.json({
      e,
      msg: "Cannot get posts",
    });
  }
});

//Get post by id localhost:3000/posts
router.get("/:id", async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post)
      return res.json({
        msg: "No post found",
      });
    return res.json({
      post,
    });
  } catch (e) {
    return res.json({
      e,
      msg: "Cannot get post",
    });
  }
});

//Delete post by id localhost:3000/posts
router.delete("/:id", auth, async (req, res) => {
  try {
    let sameUser = await Post.findById(req.params.id);
    if (sameUser.author != req.user._id) {
      return res.json({
        message: "User has no authorisation",
      });
    } else {
      let post = await Post.findByIdAndDelete(req.params.id);
      return res.json({
        message: "Post successfully deleted",
      });
    }
  } catch (e) {
    return res.json({
      e,
      message: "Unable to delete post",
    });
  }
});

//Update post by id localhost:3000/posts
// router.put();
router.put("/:id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post)
      return res.json({
        msg: "Can't update this post",
      });
    if (post.author != req.user._id)
      return res.json({
        msg: "You are not the author of this post, cant be updated",
      });
    let newpost = await Post.findByIdAndUpdate(req.params.id, req.body);
    return res.json({ newpost, msg: "Post success" });
  } catch (e) {
    return res.json({
      e,
      msg: "Cannot get post",
    });
  }
});

module.exports = router;
