const express = require("express");
const { UserModel } = require("../models/user.model");
const UserRoutes = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Block_list } = require("../middleware/Auth");

UserRoutes.post("/register", async (req, res) => {
  const { email, password, username } = req.body;
  try {
    if (req.body) {
      bcrypt.hash(password, 5, async function (err, hash) {
        if (err) {
          res.send(err.message);
        } else {
          let reg_user = new UserModel({ email, username, password: hash });
          reg_user.save();
          await res.status(200).json({ msg: "registered sucessfully" });
        }
      });
    } else {
      res.status(200).json({ msg: "user not found" });
    }
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
});

UserRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      //acess
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          var token = jwt.sign({ user: user.username }, "cleancode", {
            expiresIn: "1h",
          });
          res.status(200).json({ msg: "login sucessfull", token, user });
        } else {
          res.status(200).json({ msg: "credintials wrong" });
        }
      });
    } else {
      res
        .status(200)
        .json({ msg: "your are email is not registered in our app" });
    }
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
});

UserRoutes.post("/logout", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    Block_list.push(token);
    res.status(200).json({ msg: "Logged out sucessfully" });
  }
});
module.exports = { UserRoutes };
