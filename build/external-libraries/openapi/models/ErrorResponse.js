"use strict";
/**
 * School API
 * School API
 *
 * OpenAPI spec version: 1.0.1
 * Contact: orscarsilla@outlook.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = void 0;
class ErrorResponse {
    constructor() {
    }
    static getAttributeTypeMap() {
        return ErrorResponse.attributeTypeMap;
    }
}
exports.ErrorResponse = ErrorResponse;
ErrorResponse.discriminator = undefined;
ErrorResponse.attributeTypeMap = [
    {
        "name": "code",
        "baseName": "code",
        "type": "number",
        "format": "int32"
    },
    {
        "name": "description",
        "baseName": "description",
        "type": "string",
        "format": "string"
    }
];
