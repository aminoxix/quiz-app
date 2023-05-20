import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { port } from "./config.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`Server is building something cool! xd`);
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

export default app;
