import express from "express";
import { notes } from "../persistence.js";
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("hello world")
});

export default router;
