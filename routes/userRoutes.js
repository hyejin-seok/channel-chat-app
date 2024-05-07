const express = require("express");
const router = express.Router();
const userController = require("../controllers");

router.get("/signup", userController.signup);
router.post("/signup", userController.signupLogic);
router.get("/login", userController.login);
router.post("/login", userController.loginLogic);
router.get("/logout", userController.logout);

module.exports = router;
