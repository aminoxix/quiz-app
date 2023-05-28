const express = require("express");
const router = express.Router();
const signupHandler = require("../controllers/signup");

router.post("/", signupHandler);

module.exports = router;
