"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAccents = void 0;
const http_code_1 = require("../domain/http-code");
const http_message_1 = require("../domain/http-message");
const CustomError_1 = require("../exceptions/CustomError");
const removeAccents = (str) => {
    try {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    catch (_error) {
        throw new CustomError_1.CustomError(http_message_1.HttpMessage.INTERNAL_SERVER_ERROR, http_code_1.HttpCode.INTERNAL_SERVER_ERROR);
    }
};
exports.removeAccents = removeAccents;
