"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_code_1 = require("../../../../application/domain/http-code");
const create_video_usecase_1 = require("../../../../application/usecases/video/create-video.usecase");
const get_video_usecase_1 = require("../../../../application/usecases/video/get-video.usecase");
const modify_video_usecase_1 = require("../../../../application/usecases/video/modify-video.usecase");
const router = express_1.default.Router();
const getVideoUseCase = new get_video_usecase_1.GetVideoUseCase();
const createVideoUseCase = new create_video_usecase_1.CreateVideoUseCase();
const modifyVideoUseCase = new modify_video_usecase_1.ModifyVideoUseCase();
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield createVideoUseCase.createVideo(req.body);
        res.status(http_code_1.HttpCode.CREATED).send();
    }
    catch (err) {
        next(err);
    }
}));
router.get("/:_id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const video = yield getVideoUseCase.getVideo((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a._id);
        res.status(http_code_1.HttpCode.OK).json(video);
    }
    catch (err) {
        next(err);
    }
}));
router.patch("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        yield modifyVideoUseCase.modifyVideo((_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id, req === null || req === void 0 ? void 0 : req.body);
        res.status(http_code_1.HttpCode.OK).send();
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
