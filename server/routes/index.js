const express = require("express");
const route = express.Router();

const signupRouter = require("../routes/signup");
const loginRouter = require("../routes/login");
const quizRouter = require("../routes/quiz");

const checkUserLoggedIn = require("../auth/checkUserLoggedIn");

route.use("/signup", signupRouter);
route.use("/quiz", checkUserLoggedIn, quizRouter);
route.use("/login", loginRouter);

module.exports = route;
