import express from "express";
import videoControllerAdapter from "./controllers/adapters/video.controller.adapter";
import userControllerAdapter from "./controllers/adapters/user.controller.adapter";
import loginControllerAdapter from "./controllers/adapters/login.controller.adapter";
import lastNewControllerAdapter from "./controllers/adapters/last-new.controller.adapter";
import eventControllerAdapter from "./controllers/adapters/event.controller.adapter";
import sloganControllerAdapter from "./controllers/adapters/slogan.controller.adapter";

const router = express.Router();

router.use("/video", videoControllerAdapter);
router.use("/users", userControllerAdapter);
router.use("/login", loginControllerAdapter);
router.use("/lastNews", lastNewControllerAdapter);
router.use("/events", eventControllerAdapter);
router.use("/slogan", sloganControllerAdapter);

export default router;
