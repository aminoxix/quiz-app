const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const port = require("./config");
const db = require("./models");

const { Sessions } = require("./models");

const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

// Router
const indexRouter = require("./routes");
app.use("/api/v0", indexRouter);

app.get("/", (req, res) => {
  res.send(`Server is building something cool! xd`);
});

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  });
});

module.exports = app;
