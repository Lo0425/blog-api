const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const auth = require("../middleware/auth");

//add like

router.post("/", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { postId } = req.body;

    let post = await Post.findById(postId);
    if (!post)
      return res.json({
        msg: "Post doesn't exist",
      });

    const liked = await post.like.find((like) => like.userId == userId);

    if (liked) {
      await post.like.pull({
        userId: liked.userId,
      });
      await post.save();
      return res.json({ msg: "Post unliked", post });
    } else {
      post.like.push({
        userId,
      });
      await post.save();
      return res.json({
        msg: "Post liked",
        post,
      });
    }
    return res.json(post);
  } catch (e) {
    return res.json({ e, msg: "Cannot like" });
  }
});

module.exports = router;
