const { Users, Sessions } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  let { email, password } = req.body;

  // check if user already exists
  let isUserExists = await Users.findOne({ where: { email } });

  if (!isUserExists) {
    return res.status(400).send({ message: "User not existed!" });
  }

  // check if password is correct
  let isPasswordCorrect = bcrypt.compareSync(password, isUserExists.password);

  if (!isPasswordCorrect) {
    return res
      .status(400)
      .send({ message: "Incorrect Password, please try again!" });
  }

  // generate token
  let token = jwt.sign({ ...isUserExists }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  await Sessions.create({
    user_id: isUserExists.id,
    jwt: token,
    status: "active",
  });

  return res
    .status(200)
    .send({ message: "User logged in successfully!", token });
};

module.exports = login;
