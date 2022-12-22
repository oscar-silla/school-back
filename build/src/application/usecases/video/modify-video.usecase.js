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
exports.ModifyVideoUseCase = void 0;
const http_code_1 = require("../../domain/http-code");
const http_message_1 = require("../../domain/http-message");
const CustomError_1 = require("../../exceptions/CustomError");
const video_service_1 = require("../../services/video.service");
const check_objectid_util_1 = require("../../utils/check-objectid.util");
const { WRONG_ID_FORMAT, MISSING_PARAMS } = http_message_1.HttpMessage;
const { BAD_REQUEST } = http_code_1.HttpCode;
class ModifyVideoUseCase {
    constructor() {
        this.videoService = new video_service_1.VideoService();
    }
    checkRequestParams(id, videoSourceRequest) {
        if (!videoSourceRequest || !(videoSourceRequest === null || videoSourceRequest === void 0 ? void 0 : videoSourceRequest.src) || !id) {
            throw new CustomError_1.CustomError(MISSING_PARAMS, BAD_REQUEST, {});
        }
        if (!(0, check_objectid_util_1.checkObjectId)(id)) {
            throw new CustomError_1.CustomError(WRONG_ID_FORMAT, BAD_REQUEST, {});
        }
    }
    modifyVideo(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkRequestParams(id, body);
            yield this.videoService.modifyVideo(id, body);
        });
    }
}
exports.ModifyVideoUseCase = ModifyVideoUseCase;
