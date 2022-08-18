const mongoose = require("mongoose");
const { Schema } = mongoose;
const PostSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userName: String,
  like: { type: Array },
  comments: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      comment: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("post", PostSchema);
