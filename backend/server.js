import express from "express";
import { addFrame } from "./frame/frame.js";
import cors from "cors";

const app = express();
const port = 5000;

// add json middleware
app.use(express.json());
// add cors middleware
app.use(cors());

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/api/frame", async (req, res) => {
  console.log("body: ", req.body);
  try {
    const frame = await addFrame(req.body);
    res.send(frame);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

app.get("/api/scorecard/:id", (req, res) => {
  console.log(req.params.id);
  res.send("Your score is...!");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
