import "dotenv/config.js";

import express from "express";
import cors from "cors";
import indexRouter from "./routes/index.js";
import notesRouter from "./routes/notes.js";
// Constants
const port = process.env.PORT || 3000;

// Create http server
const app = express();

app.use(cors());
app.use(express.json());

app.use("/", indexRouter);
app.use("/notes", notesRouter);

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
