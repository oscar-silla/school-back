/**
 * School API
 * School API
 *
 * OpenAPI spec version: 1.0.8
 * Contact: orscarsilla@outlook.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */



export class VideoSourceBody {
    'src': string;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "src",
            "baseName": "src",
            "type": "string",
            "format": "string"
        }    ];

    static getAttributeTypeMap() {
        return VideoSourceBody.attributeTypeMap;
    }

    public constructor() {
    }
}

