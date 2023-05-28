const jwt = require("jsonwebtoken");

const checkUserLoggedIn = (req, res, next) => {
  const authToken = req.header("Authorization")?.split(" ")[1] || "";

  jwt.verify(authToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Session is expired, please try login in again!",
      });
    }

    res.locals.user = decoded.dataValues;

    next();
  });
};

module.exports = checkUserLoggedIn;
