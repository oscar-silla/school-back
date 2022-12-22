"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReference = void 0;
const http_code_1 = require("../domain/http-code");
const http_message_1 = require("../domain/http-message");
const CustomError_1 = require("../exceptions/CustomError");
const remove_accents_util_1 = require("./remove-accents.util");
const generateReference = (title) => {
    var _a, _b;
    if (!title) {
        throw new CustomError_1.CustomError(http_message_1.HttpMessage.MISSING_PARAMS, http_code_1.HttpCode.BAD_REQUEST, {});
    }
    else {
        let reference = (_a = (0, remove_accents_util_1.removeAccents)(title)) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        if (title.split(" ").length > 1) {
            reference = (_b = (0, remove_accents_util_1.removeAccents)(title.split(" ").join("_"))) === null || _b === void 0 ? void 0 : _b.toLowerCase();
        }
        return reference;
    }
};
exports.generateReference = generateReference;
