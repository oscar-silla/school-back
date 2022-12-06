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
exports.VideoService = void 0;
const video_repository_adapter_1 = require("../../infrastructure/repository/mongo/adapters/video.repository.adapter");
const CustomError_1 = require("../exceptions/CustomError");
class VideoService {
    constructor() {
        this.videoRepositoryAdapter = new video_repository_adapter_1.VideoRepositoryAdapter();
    }
    createVideo(videoRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.videoRepositoryAdapter.save(videoRequest);
        });
    }
    modifyVideo(id, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getVideo(id);
            yield this.videoRepositoryAdapter.modify(id, requestBody);
        });
    }
    getVideo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const video = yield this.videoRepositoryAdapter.getOne(id);
            if (!video) {
                throw new CustomError_1.CustomError(`Video with id = "${id}" not found.`, 404);
            }
            else {
                return video;
            }
        });
    }
}
exports.VideoService = VideoService;
