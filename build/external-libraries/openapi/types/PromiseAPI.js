"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiseVideoApi = exports.PromiseSectionApi = void 0;
const ObservableAPI_1 = require("./ObservableAPI");
class PromiseSectionApi {
    constructor(configuration, requestFactory, responseProcessor) {
        this.api = new ObservableAPI_1.ObservableSectionApi(configuration, requestFactory, responseProcessor);
    }
    /**
     * Create section
     * Create section
     * @param body Section body
     */
    createSection(body, _options) {
        const result = this.api.createSection(body, _options);
        return result.toPromise();
    }
    /**
     * Delete an existing section by ObjectId
     * Delete an existing section
     * @param id ObjectId param.
     */
    deleteSection(id, _options) {
        const result = this.api.deleteSection(id, _options);
        return result.toPromise();
    }
    /**
     * Get an existing section by ObjectId.
     * Get an existing section
     * @param id ObjectId param.
     */
    getSection(id, _options) {
        const result = this.api.getSection(id, _options);
        return result.toPromise();
    }
    /**
     * Get all sections
     * Get sections
     */
    getSections(_options) {
        const result = this.api.getSections(_options);
        return result.toPromise();
    }
    /**
     * Modify an existing section by ObjectId
     * Modify an existing section
     * @param id ObjectId param.
     * @param body Section body
     */
    modifySection(id, body, _options) {
        const result = this.api.modifySection(id, body, _options);
        return result.toPromise();
    }
}
exports.PromiseSectionApi = PromiseSectionApi;
const ObservableAPI_2 = require("./ObservableAPI");
class PromiseVideoApi {
    constructor(configuration, requestFactory, responseProcessor) {
        this.api = new ObservableAPI_2.ObservableVideoApi(configuration, requestFactory, responseProcessor);
    }
    /**
     * Create video
     * Create video
     * @param body Video body
     */
    createVideo(body, _options) {
        const result = this.api.createVideo(body, _options);
        return result.toPromise();
    }
    /**
     * Get existing video by ObjectId.
     * Get an existing video
     * @param id ObjectId param.
     */
    getVideo(id, _options) {
        const result = this.api.getVideo(id, _options);
        return result.toPromise();
    }
    /**
     * Modify 'src' from video.
     * Modify an existing video
     * @param id ObjectId param.
     * @param body Video source body param.
     */
    modifyVideo(id, body, _options) {
        const result = this.api.modifyVideo(id, body, _options);
        return result.toPromise();
    }
}
exports.PromiseVideoApi = PromiseVideoApi;
