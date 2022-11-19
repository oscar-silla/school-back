import express from "express";
const router = express.Router();
import video from "./controllers/video-controller";

router.use("/video", video);

export default router;
