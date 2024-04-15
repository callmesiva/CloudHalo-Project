const express = require("express");
const router = express.Router();
const auth = require("../controller/loginControl");

router.post("/login", auth.login);
router.post("/register", auth.register);

module.exports = router;
