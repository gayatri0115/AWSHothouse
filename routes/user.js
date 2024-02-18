const express = require("express");

const userControllers = require("../controllers/user");

const router = express.Router();

router.post("/registration", userControllers.register);

router.post("/login", userControllers.login);

module.exports = router;