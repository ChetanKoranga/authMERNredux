const jwt = require("jsonwebtoken");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const getToken = require("../jwt/getToken");

const User = require("../model/user");
const { registerValidation, loginValidation } = require("../validation");

// login route
router.post("/login", async (req, res) => {
  console.log("LOGIN REQUESTED");
  // validate the user
  const { error } = loginValidation(req.body);
  // throw validation errors
  if (error) return res.status(400).json({ error: error.details[0].message });
  const user = await User.findOne({ email: req.body.email });
  // throw error when email is wrong
  if (!user) return res.status(400).json({ error: "Email is wrong" });
  // check for password correctness
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({ error: "Password is wrong" });

  // create token
  const token = getToken(user);
  res.json({
    error: null,
    user: {
      username: user.name,
      email: user.email,
      id: user._id,
    },
    token: token,
  });
});

router.post("/register", async (req, res) => {
  // validate the user

  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const isEmailExist = await User.findOne({ email: req.body.email });
  if (isEmailExist) {
    return res.status(400).json({ error: "Email already exists." });
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password,
  });

  try {
    const savedUser = await user.save();
    const token = getToken(user);

    res.json({
      error: null,
      user: {
        username: savedUser.name,
        email: savedUser.email,
        id: savedUser.id,
      },
      token: token,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// getUser route
router.get("/user", async (req, res) => {
  console.log("LOADUSER REQUESTED");
  // validate the user
  if (req.headers.token) {
    const user_id = jwt.decode(req.headers.token).id;

    try {
      const user = await User.findOne({ _id: user_id });

      res.json({
        error: null,
        user: { username: user.name, id: user._id, email: user.email },
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  } else {
    res.status(400).json({ error: "Please Login or Register" });
  }
});

// getUser route
router.get("/logout", async (req, res) => {
  console.log("LOGOUT USER REQUESTED");

  res.status(200).json({ message: "Logged Out" });
});

module.exports = router;
