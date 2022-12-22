"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const video_controller_adapter_1 = __importDefault(require("./controllers/adapters/video.controller.adapter"));
const section_controller_adapter_1 = __importDefault(require("./controllers/adapters/section.controller.adapter"));
router.use("/video", video_controller_adapter_1.default);
router.use("/sections", section_controller_adapter_1.default);
exports.default = router;
