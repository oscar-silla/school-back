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
exports.VideoRepositoryAdapter = void 0;
const videos_collection_1 = require("../collections/videos.collection");
class VideoRepositoryAdapter {
    constructor() {
        this.videosCollection = new videos_collection_1.VideosCollection();
    }
    save(videoRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.videosCollection.save(videoRequest);
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.videosCollection.getOne(id);
        });
    }
    modify(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.videosCollection.modify(id, payload);
        });
    }
}
exports.VideoRepositoryAdapter = VideoRepositoryAdapter;
