const jwt = require("jsonwebtoken");
const token = (user) => {
  return jwt.sign(
    // payload data
    {
      name: user.name,
      id: user._id,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "20s" },
  );
};

module.exports = token;
