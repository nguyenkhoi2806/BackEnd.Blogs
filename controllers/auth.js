const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = async (req, res, next) => {
  try {
    await User.findOne({ email: req.body.email }).then((userDoc) => {
      if (userDoc) {
        const error = new Error("E-Mail address already exists!");
        error.statusCode = 200;
        throw error;
      }
    });
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    const hashedPw = await bcrypt.hash(password, 12);

    const user = new User({
      email: email,
      password: hashedPw,
      name: name,
    });
    const result = await user.save();
    const token = jwt.sign(
      {
        email: result.email,
        userId: result._id.toString(),
      },
      "somesupersecretsecret",
      { expiresIn: "1h" }
    );
    res.status(201).json({
      message: "User created!",
      user: {
        name: result.name,
        email: result.email,
      },
      token: token,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("User with this email could not be found.");
      error.statusCode = 200;
      throw error;
    }
    loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Wrong password!");
      error.statusCode = 200;
      throw error;
    }
    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString(),
      },
      "somesupersecretsecret",
      { expiresIn: "1h" }
    );
    res.status(200).json({
      token: token,
      user: {
        email: loadedUser.email,
        name: loadedUser.name,
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("User not found.");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ status: user.status });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateUserStatus = async (req, res, next) => {
  const newStatus = req.body.status;
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("User not found.");
      error.statusCode = 404;
      throw error;
    }
    user.status = newStatus;
    await user.save();
    res.status(200).json({ message: "User updated." });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
