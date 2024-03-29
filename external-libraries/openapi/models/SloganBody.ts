/**
 * School API
 * School API
 *
 * OpenAPI spec version: 1.0.10
 * Contact: orscarsilla@outlook.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */



export class SloganBody {
    'title': string;
    'description': string;
    'img': string;
    'textButton'?: string;
    'url'?: string;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
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
        },
        {
            "name": "textButton",
            "baseName": "textButton",
            "type": "string",
            "format": "string"
        },
        {
            "name": "url",
            "baseName": "url",
            "type": "string",
            "format": "string"
        }    ];

    static getAttributeTypeMap() {
        return SloganBody.attributeTypeMap;
    }

    public constructor() {
    }
}

