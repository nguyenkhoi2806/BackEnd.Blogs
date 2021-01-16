const express = require("express");
const { body } = require("express-validator/check");

const authController = require("../controllers/auth");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.put(
  "/signup",
  authController.signup
);

router.post("/login", authController.login);

router.get("/status", isAuth, authController.getUserStatus);

router.patch(
  "/status",
  isAuth,
  [body("status").trim().not().isEmpty()],
  authController.updateUserStatus
);

module.exports = router;
