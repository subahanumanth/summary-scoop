import express from "express";
import { summarizeYTVideo } from "../controller/summaryController";

const router = express.Router();

router.post("/summarize", (req, res) => {
  summarizeYTVideo(req, res);
});

export default router;
