import express from "express";
const router = express.Router();
import video from "./controllers/adapters/video.controller.adapter";

router.use("/video", video);

export default router;
