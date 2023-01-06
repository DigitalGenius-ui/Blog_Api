const router = require("express").Router();
const {
  createPost,
  deletePost,
  getAllPost,
  getSinglePost,
  updatePost,
  postLike,
} = require("../Controllers/PostController.js");

// get all posts
router.get("/", getAllPost);

// create post
router.post("/create", createPost);

// update post
router.put("/update/:id", updatePost);

// delete post
router.delete("/:id", deletePost);

// get single post
router.get("/:id", getSinglePost);

// like post
router.post("/:id", postLike)

module.exports = router;
