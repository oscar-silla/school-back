/**
 * School API
 * School API
 *
 * OpenAPI spec version: 1.0.4
 * Contact: orscarsilla@outlook.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */



export class GeneratedIdResponse {
    'generatedId'?: string;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "generatedId",
            "baseName": "generatedId",
            "type": "string",
            "format": "string"
        }    ];

    static getAttributeTypeMap() {
        return GeneratedIdResponse.attributeTypeMap;
    }

    public constructor() {
    }
}

