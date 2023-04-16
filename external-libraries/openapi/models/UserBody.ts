/**
 * School API
 * School API
 *
 * OpenAPI spec version: 1.0.9
 * Contact: orscarsilla@outlook.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */



export class UserBody {
    'username': string;
    'password': string;
    'name': string;
    'email': string;
    'surnames'?: string;
    'avatar'?: string;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "username",
            "baseName": "username",
            "type": "string",
            "format": "string"
        },
        {
            "name": "password",
            "baseName": "password",
            "type": "string",
            "format": "string"
        },
        {
            "name": "name",
            "baseName": "name",
            "type": "string",
            "format": "string"
        },
        {
            "name": "email",
            "baseName": "email",
            "type": "string",
            "format": "string"
        },
        {
            "name": "surnames",
            "baseName": "surnames",
            "type": "string",
            "format": "string"
        },
        {
            "name": "avatar",
            "baseName": "avatar",
            "type": "string",
            "format": "string"
        }    ];

    static getAttributeTypeMap() {
        return UserBody.attributeTypeMap;
    }

    public constructor() {
    }
}

