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



export class EventResponse {
    'id'?: string;
    'title'?: string;
    'description'?: string;
    'img'?: string;
    'content'?: string;
    'color'?: string;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "id",
            "baseName": "id",
            "type": "string",
            "format": "string"
        },
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
            "name": "content",
            "baseName": "content",
            "type": "string",
            "format": "string"
        },
        {
            "name": "color",
            "baseName": "color",
            "type": "string",
            "format": "string"
        }    ];

    static getAttributeTypeMap() {
        return EventResponse.attributeTypeMap;
    }

    public constructor() {
    }
}

