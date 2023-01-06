const router = require("express").Router();
const { registerUser, loginUser } = require("../Controllers/UserController.js");

// register user 
router.post("/register", registerUser);

// login user 
router.post("/login", loginUser);

module.exports = router