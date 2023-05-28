const { Users } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let salt = bcrypt.genSaltSync(10);

const signup = async (req, res) => {
  let { full_name, email, password } = req.body;

  // encrypt password
  let hashPassword = bcrypt.hashSync(password, salt);

  // check if user already exists
  let isUserExists = await Users.findOne({ where: { email } });

  if (isUserExists) {
    return res.status(400).send({ message: "User already exists!" });
  }

  // generate token
  let token = jwt.sign({ ...isUserExists }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  await Users.create({
    full_name,
    email,
    password: hashPassword,
  });

  return res.status(200).send({ message: "User created successfully!", token });
};

module.exports = signup;
