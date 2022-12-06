"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectVideoApi = exports.ObjectSectionApi = void 0;
const ObservableAPI_1 = require("./ObservableAPI");
class ObjectSectionApi {
    constructor(configuration, requestFactory, responseProcessor) {
        this.api = new ObservableAPI_1.ObservableSectionApi(configuration, requestFactory, responseProcessor);
    }
    /**
     * Create section
     * Create section
     * @param param the request object
     */
    createSection(param, options) {
        return this.api.createSection(param.body, options).toPromise();
    }
    /**
     * Delete an existing section by ObjectId
     * Delete an existing section
     * @param param the request object
     */
    deleteSection(param, options) {
        return this.api.deleteSection(param.id, options).toPromise();
    }
    /**
     * Get an existing section by ObjectId.
     * Get an existing section
     * @param param the request object
     */
    getSection(param, options) {
        return this.api.getSection(param.id, options).toPromise();
    }
    /**
     * Get all sections
     * Get sections
     * @param param the request object
     */
    getSections(param = {}, options) {
        return this.api.getSections(options).toPromise();
    }
    /**
     * Modify an existing section by ObjectId
     * Modify an existing section
     * @param param the request object
     */
    modifySection(param, options) {
        return this.api.modifySection(param.id, param.body, options).toPromise();
    }
}
exports.ObjectSectionApi = ObjectSectionApi;
const ObservableAPI_2 = require("./ObservableAPI");
class ObjectVideoApi {
    constructor(configuration, requestFactory, responseProcessor) {
        this.api = new ObservableAPI_2.ObservableVideoApi(configuration, requestFactory, responseProcessor);
    }
    /**
     * Create video
     * Create video
     * @param param the request object
     */
    createVideo(param, options) {
        return this.api.createVideo(param.body, options).toPromise();
    }
    /**
     * Get existing video by ObjectId.
     * Get an existing video
     * @param param the request object
     */
    getVideo(param, options) {
        return this.api.getVideo(param.id, options).toPromise();
    }
    /**
     * Modify 'src' from video.
     * Modify an existing video
     * @param param the request object
     */
    modifyVideo(param, options) {
        return this.api.modifyVideo(param.id, param.body, options).toPromise();
    }
}
exports.ObjectVideoApi = ObjectVideoApi;
