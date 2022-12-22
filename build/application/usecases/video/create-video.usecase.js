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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVideoUseCase = void 0;
const CustomError_1 = require("../../exceptions/CustomError");
const video_service_1 = require("../../services/video.service");
const videoService = new video_service_1.VideoService();
class CreateVideoUseCase {
    checkRequestBody(videoRequest) {
        const { ref, src } = videoRequest;
        if (!ref || !src) {
            throw new CustomError_1.CustomError("Missing request body params.", 400, {});
        }
    }
    createVideo(videoRequestParams) {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkRequestBody(videoRequestParams);
            return yield videoService.createVideo(videoRequestParams);
        });
    }
}
exports.CreateVideoUseCase = CreateVideoUseCase;
