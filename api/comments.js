const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const auth = require("../middleware/auth");
const { deleteOne } = require("../models/User");

//add comment

router.post("/", auth, async (req, res) => {
  try {
    const { postId, comment } = req.body;
    const userId = req.user._id;

    let post = await Post.findById(postId);
    if (!post) return res.json({ msg: "Post doesn't exist" });

    // let comment = await req.body.comments;
    post.comments.push({ userId, comment });

    await post.save();
    return res.json({ msg: "Comment added", post });
  } catch (e) {
    return res.json({ e, msg: "Failed to add comment" });
  }
});

//delete comment
router.delete("/:id", auth, async (req, res) => {
  try {
    const { postId } = req.body;

    let post = await Post.findById(postId);

    if (!post) return res.json({ msg: "No post found" });

    let comment = await post.comments.find(
      (comments) => comments._id == req.params.id
    );

    if (!comment) return res.json({ msg: "Comment not found" });

    await post.comments.pull({
      _id: req.params.id,
    });

    await post.save();
    return res.json({ msg: "comment deleted" });
  } catch (e) {
    return res.json({
      e,
      msg: "Cannot delete comment",
    });
  }
});

// edit comment
router.put("/:id", auth, async (req, res) => {
  try {
    const { newComment, postId } = req.body;

    console.log(newComment, postId);
    let commentId = req.params.id;

    let post = await Post.findById(postId);

    if (!post) return res.json({ msg: "No post found" });

    let comment = await post.comments.find(
      (comments) => comments._id == commentId
    );

    if (!comment) return res.json({ msg: "Comment not found" });

    comment.comment = newComment;

    await post.save();
    return res.json({ comment, msg: "comment edited" });
  } catch (e) {
    return res.json({
      e,
      msg: "Cannot edit comment",
    });
  }
});

module.exports = router;
