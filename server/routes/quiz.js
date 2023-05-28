const express = require("express");
const router = express.Router();
const { createQuiz, getAllQuiz } = require("../controllers/quiz");

router.post("/", createQuiz);
router.get("/", getAllQuiz);

module.exports = router;
