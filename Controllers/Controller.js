const Blog = require("../DB/PostsSchema.js");

// get all posts
const getAllPost = async (req, res) => {
  try {
    const posts = await Blog.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// create posts
const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new Blog(post);
  try {
    const createPost = await newPost.save();
    res.status(200).json(createPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update post
const updatePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const posts = await Blog.findByIdAndUpdate(postId, {
      title: req.body.title,
      description: req.body.description,
      tags: req.body.tags,
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete post
const deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    await Blog.findByIdAndDelete(postId);
    res.status(200).json("Post is successfully deleted.");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSinglePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const singlePost = await Blog.findById(postId);

    if (postId !== singlePost._id.toString()) {
      res.status(404).json("There is not post with this id");
    }

    res.status(200).json(singlePost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPost,
  createPost,
  updatePost,
  deletePost,
  getSinglePost,
};
