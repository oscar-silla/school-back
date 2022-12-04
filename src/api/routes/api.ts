import express from "express";
const router = express.Router();
import videoController from "./controllers/adapters/video.controller.adapter";
import sectionController from "./controllers/adapters/section.controller.adapter";

router.use("/video", videoController);
router.use("/sections", sectionController);

export default router;
