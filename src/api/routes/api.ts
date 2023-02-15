import express from "express";
const router = express.Router();
import videoController from "./controllers/adapters/video.controller.adapter";
import sectionController from "./controllers/adapters/section.controller.adapter";
import userController from "./controllers/adapters/user.controller.adapter";
import loginController from "./controllers/adapters/login.controller.adapter";
import articleController from "./controllers/adapters/article.controller.adapter";

router.use("/video", videoController);
router.use("/sections", sectionController);
router.use("/users", userController);
router.use("/login", loginController);
router.use("/articles", articleController);

export default router;
