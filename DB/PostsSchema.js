const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageFile: {
      type: String,
      required: false,
    },
    tags: {
      type: [String],
      required: false,
    },
    likeCount: {
      type: String,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  }
);

const Blog = mongoose.model("posts", postSchema);

module.exports = Blog;
