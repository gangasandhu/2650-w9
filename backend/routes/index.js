import express from "express";
import { notes } from "../persistence.js";
import genImage from "../api.js";
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("hello world")
});

router.post("/api/generate-image", genImage)

export default router;
