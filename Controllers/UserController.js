const User = require("../DB/UserSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register user
const registerUser = async (req, res) => {
  const { username, password, email } = req.body;
  const newPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      username,
      password: newPassword,
      email,
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// login user
const loginUser = async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
  });

  try {
    if (!user) {
      res.status(404).json("user is not valid");
    }

    const newPassword = await bcrypt.compare(req.body.password, user.password);
    if (!newPassword) {
      res.status(500).json("invalid Password!!");
    }

    if (user) {
      const userId = user._id;
      const accessToken = jwt.sign({ userId }, process.env.TOKEN_KEY, {
        expiresIn: "15m",
      });
      res.status(200).json({
        username: user.username,
        accessToken,
      });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = { registerUser, loginUser };
