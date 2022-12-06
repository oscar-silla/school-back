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
exports.SectionApiResponseProcessor = exports.SectionApiRequestFactory = void 0;
// TODO: better import syntax?
const baseapi_1 = require("./baseapi");
const http_1 = require("../http/http");
const ObjectSerializer_1 = require("../models/ObjectSerializer");
const exception_1 = require("./exception");
const util_1 = require("../util");
/**
 * no description
 */
class SectionApiRequestFactory extends baseapi_1.BaseAPIRequestFactory {
    /**
     * Create section
     * Create section
     * @param body Section body
     */
    createSection(body, _options) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            let _config = _options || this.configuration;
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new baseapi_1.RequiredError("SectionApi", "createSection", "body");
            }
            // Path Params
            const localVarPath = '/sections';
            // Make Request Context
            const requestContext = _config.baseServer.makeRequestContext(localVarPath, http_1.HttpMethod.POST);
            requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8");
            // Body Params
            const contentType = ObjectSerializer_1.ObjectSerializer.getPreferredMediaType([
                "application/json"
            ]);
            requestContext.setHeaderParam("Content-Type", contentType);
            const serializedBody = ObjectSerializer_1.ObjectSerializer.stringify(ObjectSerializer_1.ObjectSerializer.serialize(body, "SectionBody", ""), contentType);
            requestContext.setBody(serializedBody);
            const defaultAuth = ((_a = _options === null || _options === void 0 ? void 0 : _options.authMethods) === null || _a === void 0 ? void 0 : _a.default) || ((_c = (_b = this.configuration) === null || _b === void 0 ? void 0 : _b.authMethods) === null || _c === void 0 ? void 0 : _c.default);
            if (defaultAuth === null || defaultAuth === void 0 ? void 0 : defaultAuth.applySecurityAuthentication) {
                yield (defaultAuth === null || defaultAuth === void 0 ? void 0 : defaultAuth.applySecurityAuthentication(requestContext));
            }
            return requestContext;
        });
    }
    /**
     * Delete an existing section by ObjectId
     * Delete an existing section
     * @param id ObjectId param.
     */
    deleteSection(id, _options) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            let _config = _options || this.configuration;
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new baseapi_1.RequiredError("SectionApi", "deleteSection", "id");
            }
            // Path Params
            const localVarPath = '/sections/{id}'
                .replace('{' + '_id' + '}', encodeURIComponent(String(id)));
            // Make Request Context
            const requestContext = _config.baseServer.makeRequestContext(localVarPath, http_1.HttpMethod.DELETE);
            requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8");
            const defaultAuth = ((_a = _options === null || _options === void 0 ? void 0 : _options.authMethods) === null || _a === void 0 ? void 0 : _a.default) || ((_c = (_b = this.configuration) === null || _b === void 0 ? void 0 : _b.authMethods) === null || _c === void 0 ? void 0 : _c.default);
            if (defaultAuth === null || defaultAuth === void 0 ? void 0 : defaultAuth.applySecurityAuthentication) {
                yield (defaultAuth === null || defaultAuth === void 0 ? void 0 : defaultAuth.applySecurityAuthentication(requestContext));
            }
            return requestContext;
        });
    }
    /**
     * Get an existing section by ObjectId.
     * Get an existing section
     * @param id ObjectId param.
     */
    getSection(id, _options) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            let _config = _options || this.configuration;
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new baseapi_1.RequiredError("SectionApi", "getSection", "id");
            }
            // Path Params
            const localVarPath = '/sections/{id}'
                .replace('{' + '_id' + '}', encodeURIComponent(String(id)));
            // Make Request Context
            const requestContext = _config.baseServer.makeRequestContext(localVarPath, http_1.HttpMethod.GET);
            requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8");
            const defaultAuth = ((_a = _options === null || _options === void 0 ? void 0 : _options.authMethods) === null || _a === void 0 ? void 0 : _a.default) || ((_c = (_b = this.configuration) === null || _b === void 0 ? void 0 : _b.authMethods) === null || _c === void 0 ? void 0 : _c.default);
            if (defaultAuth === null || defaultAuth === void 0 ? void 0 : defaultAuth.applySecurityAuthentication) {
                yield (defaultAuth === null || defaultAuth === void 0 ? void 0 : defaultAuth.applySecurityAuthentication(requestContext));
            }
            return requestContext;
        });
    }
    /**
     * Get all sections
     * Get sections
     */
    getSections(_options) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            let _config = _options || this.configuration;
            // Path Params
            const localVarPath = '/sections';
            // Make Request Context
            const requestContext = _config.baseServer.makeRequestContext(localVarPath, http_1.HttpMethod.GET);
            requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8");
            const defaultAuth = ((_a = _options === null || _options === void 0 ? void 0 : _options.authMethods) === null || _a === void 0 ? void 0 : _a.default) || ((_c = (_b = this.configuration) === null || _b === void 0 ? void 0 : _b.authMethods) === null || _c === void 0 ? void 0 : _c.default);
            if (defaultAuth === null || defaultAuth === void 0 ? void 0 : defaultAuth.applySecurityAuthentication) {
                yield (defaultAuth === null || defaultAuth === void 0 ? void 0 : defaultAuth.applySecurityAuthentication(requestContext));
            }
            return requestContext;
        });
    }
    /**
     * Modify an existing section by ObjectId
     * Modify an existing section
     * @param id ObjectId param.
     * @param body Section body
     */
    modifySection(id, body, _options) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            let _config = _options || this.configuration;
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new baseapi_1.RequiredError("SectionApi", "modifySection", "id");
            }
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new baseapi_1.RequiredError("SectionApi", "modifySection", "body");
            }
            // Path Params
            const localVarPath = '/sections/{id}'
                .replace('{' + '_id' + '}', encodeURIComponent(String(id)));
            // Make Request Context
            const requestContext = _config.baseServer.makeRequestContext(localVarPath, http_1.HttpMethod.PATCH);
            requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8");
            // Body Params
            const contentType = ObjectSerializer_1.ObjectSerializer.getPreferredMediaType([
                "application/json"
            ]);
            requestContext.setHeaderParam("Content-Type", contentType);
            const serializedBody = ObjectSerializer_1.ObjectSerializer.stringify(ObjectSerializer_1.ObjectSerializer.serialize(body, "SectionBody", ""), contentType);
            requestContext.setBody(serializedBody);
            const defaultAuth = ((_a = _options === null || _options === void 0 ? void 0 : _options.authMethods) === null || _a === void 0 ? void 0 : _a.default) || ((_c = (_b = this.configuration) === null || _b === void 0 ? void 0 : _b.authMethods) === null || _c === void 0 ? void 0 : _c.default);
            if (defaultAuth === null || defaultAuth === void 0 ? void 0 : defaultAuth.applySecurityAuthentication) {
                yield (defaultAuth === null || defaultAuth === void 0 ? void 0 : defaultAuth.applySecurityAuthentication(requestContext));
            }
            return requestContext;
        });
    }
}
exports.SectionApiRequestFactory = SectionApiRequestFactory;
class SectionApiResponseProcessor {
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to createSection
     * @throws ApiException if the response code was not in [200, 299]
     */
    createSection(response) {
        return __awaiter(this, void 0, void 0, function* () {
            const contentType = ObjectSerializer_1.ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
            if ((0, util_1.isCodeInRange)("201", response.httpStatusCode)) {
                return;
            }
            if ((0, util_1.isCodeInRange)("400", response.httpStatusCode)) {
                const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(yield response.body.text(), contentType), "ErrorResponse", "");
                throw new exception_1.ApiException(response.httpStatusCode, "Bad request.", body, response.headers);
            }
            if ((0, util_1.isCodeInRange)("401", response.httpStatusCode)) {
                const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(yield response.body.text(), contentType), "ErrorResponse", "");
                throw new exception_1.ApiException(response.httpStatusCode, "Unauthorized.", body, response.headers);
            }
            if ((0, util_1.isCodeInRange)("404", response.httpStatusCode)) {
                const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(yield response.body.text(), contentType), "ErrorResponse", "");
                throw new exception_1.ApiException(response.httpStatusCode, "Not found.", body, response.headers);
            }
            // Work around for missing responses in specification, e.g. for petstore.yaml
            if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
                const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(yield response.body.text(), contentType), "void", "");
                return body;
            }
            throw new exception_1.ApiException(response.httpStatusCode, "Unknown API Status Code!", yield response.getBodyAsAny(), response.headers);
        });
    }
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to deleteSection
     * @throws ApiException if the response code was not in [200, 299]
     */
    deleteSection(response) {
        return __awaiter(this, void 0, void 0, function* () {
            const contentType = ObjectSerializer_1.ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
            if ((0, util_1.isCodeInRange)("204", response.httpStatusCode)) {
                return;
            }
            if ((0, util_1.isCodeInRange)("400", response.httpStatusCode)) {
                const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(yield response.body.text(), contentType), "ErrorResponse", "");
                throw new exception_1.ApiException(response.httpStatusCode, "Bad request.", body, response.headers);
            }
            if ((0, util_1.isCodeInRange)("401", response.httpStatusCode)) {
                const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(yield response.body.text(), contentType), "ErrorResponse", "");
                throw new exception_1.ApiException(response.httpStatusCode, "Unauthorized.", body, response.headers);
            }
            if ((0, util_1.isCodeInRange)("404", response.httpStatusCode)) {
                const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(yield response.body.text(), contentType), "ErrorResponse", "");
                throw new exception_1.ApiException(response.httpStatusCode, "Not found.", body, response.headers);
            }
            // Work around for missing responses in specification, e.g. for petstore.yaml
            if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
                const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(yield response.body.text(), contentType), "void", "");
                return body;
            }
            throw new exception_1.ApiException(response.httpStatusCode, "Unknown API Status Code!", yield response.getBodyAsAny(), response.headers);
        });
    }
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to getSection
     * @throws ApiException if the response code was not in [200, 299]
     */
    getSection(response) {
        return __awaiter(this, void 0, void 0, function* () {
            const contentType = ObjectSerializer_1.ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
            if ((0, util_1.isCodeInRange)("200", response.httpStatusCode)) {
                const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(yield response.body.text(), contentType), "SectionResponse", "");
                return body;
            }
            if ((0, util_1.isCodeInRange)("400", response.httpStatusCode)) {
                const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(yield response.body.text(), contentType), "ErrorResponse", "");
                throw new exception_1.ApiException(response.httpStatusCode, "Bad request.", body, response.headers);
            }
            if ((0, util_1.isCodeInRange)("401", response.httpStatusCode)) {
                const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(yield response.body.text(), contentType), "ErrorResponse", "");
                throw new exception_1.ApiException(response.httpStatusCode, "Unauthorized.", body, response.headers);
            }
            if ((0, util_1.isCodeInRange)("404", response.httpStatusCode)) {
                const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(yield response.body.text(), contentType), "ErrorResponse", "");
                throw new exception_1.ApiException(response.httpStatusCode, "Not found.", body, response.headers);
            }
            // Work around for missing responses in specification, e.g. for petstore.yaml
            if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
                const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(yield response.body.text(), contentType), "SectionResponse", "");
                return body;
            }
            throw new exception_1.ApiException(response.httpStatusCode, "Unknown API Status Code!", yield response.getBodyAsAny(), response.headers);
        });
    }
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to getSections
     * @throws ApiException if the response code was not in [200, 299]
     */
    getSections(response) {
        return __awaiter(this, void 0, void 0, function* () {
            const contentType = ObjectSerializer_1.ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
            if ((0, util_1.isCodeInRange)("200", response.httpStatusCode)) {
                const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(yield response.body.text(), contentType), "Array<SectionResponse>", "");
                return body;
            }
            if ((0, util_1.isCodeInRange)("400", response.httpStatusCode)) {
                const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(yield response.body.text(), contentType), "ErrorResponse", "");
                throw new exception_1.ApiException(response.httpStatusCode, "Bad request.", body, response.headers);
            }
            if ((0, util_1.isCodeInRange)("401", response.httpStatusCode)) {
                const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(yield response.body.text(), contentType), "ErrorResponse", "");
                throw new exception_1.ApiException(response.httpStatusCode, "Unauthorized.", body, response.headers);
            }
            if ((0, util_1.isCodeInRange)("404", response.httpStatusCode)) {
                const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(yield response.body.text(), contentType), "ErrorResponse", "");
                throw new exception_1.ApiException(response.httpStatusCode, "Not found.", body, response.headers);
            }
            // Work around for missing responses in specification, e.g. for petstore.yaml
            if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
                const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(yield response.body.text(), contentType), "Array<SectionResponse>", "");
                return body;
            }
            throw new exception_1.ApiException(response.httpStatusCode, "Unknown API Status Code!", yield response.getBodyAsAny(), response.headers);
        });
    }
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to modifySection
     * @throws ApiException if the response code was not in [200, 299]
     */
    modifySection(response) {
        return __awaiter(this, void 0, void 0, function* () {
            const contentType = ObjectSerializer_1.ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
            if ((0, util_1.isCodeInRange)("200", response.httpStatusCode)) {
                return;
            }
            if ((0, util_1.isCodeInRange)("400", response.httpStatusCode)) {
                const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(yield response.body.text(), contentType), "ErrorResponse", "");
                throw new exception_1.ApiException(response.httpStatusCode, "Bad request.", body, response.headers);
            }
            if ((0, util_1.isCodeInRange)("401", response.httpStatusCode)) {
                const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(yield response.body.text(), contentType), "ErrorResponse", "");
                throw new exception_1.ApiException(response.httpStatusCode, "Unauthorized.", body, response.headers);
            }
            if ((0, util_1.isCodeInRange)("404", response.httpStatusCode)) {
                const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(yield response.body.text(), contentType), "ErrorResponse", "");
                throw new exception_1.ApiException(response.httpStatusCode, "Not found.", body, response.headers);
            }
            // Work around for missing responses in specification, e.g. for petstore.yaml
            if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
                const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(yield response.body.text(), contentType), "void", "");
                return body;
            }
            throw new exception_1.ApiException(response.httpStatusCode, "Unknown API Status Code!", yield response.getBodyAsAny(), response.headers);
        });
    }
}
exports.SectionApiResponseProcessor = SectionApiResponseProcessor;
