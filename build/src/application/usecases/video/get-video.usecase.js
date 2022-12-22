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
exports.GetVideoUseCase = void 0;
const CustomError_1 = require("../../exceptions/CustomError");
const video_service_1 = require("../../services/video.service");
const check_objectid_util_1 = require("../../utils/check-objectid.util");
class GetVideoUseCase {
    constructor() {
        this.videoService = new video_service_1.VideoService();
    }
    checkRequestParams(id) {
        if (!id)
            throw new CustomError_1.CustomError("Missing request params.", 400);
        if (!(0, check_objectid_util_1.checkObjectId)(id))
            throw new CustomError_1.CustomError("Provided id has not valid format.", 400);
    }
    getVideo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkRequestParams(id);
            return yield this.videoService.getVideo(id);
        });
    }
}
exports.GetVideoUseCase = GetVideoUseCase;
