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
exports.SectionBody = void 0;
class SectionBody {
    constructor() {
    }
    static getAttributeTypeMap() {
        return SectionBody.attributeTypeMap;
    }
}
exports.SectionBody = SectionBody;
SectionBody.discriminator = undefined;
SectionBody.attributeTypeMap = [
    {
        "name": "title",
        "baseName": "title",
        "type": "string",
        "format": "string"
    },
    {
        "name": "description",
        "baseName": "description",
        "type": "string",
        "format": "string"
    },
    {
        "name": "img",
        "baseName": "img",
        "type": "string",
        "format": "string"
    }
];
