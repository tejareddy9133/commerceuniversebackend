const jwt = require("jsonwebtoken");
const Block_list = [];
const Authmiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (Block_list.includes(token)) {
    res.status(200).json({ msg: "please login again " });
  }
  console.log(token);
  if (token) {
    jwt.verify(token, "cleancode", function (err, decoded) {
      if (err) {
        res.status(400).json({ msg: "your token has expired" });
      }
      console.log(decoded);
      next();
    });
  } else {
    res.status(400).json({ msg: "Please login again" });
  }
};

module.exports = { Authmiddleware, Block_list };
