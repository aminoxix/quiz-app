const { Quizzes } = require("../models");

const createQuiz = async (req, res) => {
  let { title, description, is_published } = req.body;
  await Quizzes.create({
    user_id: res.locals.user.id,
    title,
    description,
    is_published,
  });
  return res.status(200).send({ message: "Quiz created successfully!" });
};

const getAllQuiz = async (req, res) => {
  const quizzes = await Quizzes.findAll();
  res.json(quizzes);
};

module.exports = { createQuiz, getAllQuiz };
