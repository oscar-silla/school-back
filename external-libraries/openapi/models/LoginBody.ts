/**
 * School API
 * School API
 *
 * OpenAPI spec version: 1.0.5
 * Contact: orscarsilla@outlook.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */



export class LoginBody {
    'email': string;
    'password': string;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "email",
            "baseName": "email",
            "type": "string",
            "format": "string"
        },
        {
            "name": "password",
            "baseName": "password",
            "type": "string",
            "format": "string"
        }    ];

    static getAttributeTypeMap() {
        return LoginBody.attributeTypeMap;
    }

    public constructor() {
    }
}
