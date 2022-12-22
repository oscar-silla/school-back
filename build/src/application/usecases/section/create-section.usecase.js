"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSectionUseCase = void 0;
const http_code_1 = require("../../domain/http-code");
const http_message_1 = require("../../domain/http-message");
const CustomError_1 = require("../../exceptions/CustomError");
const section_service_1 = require("../../services/section.service");
const { MISSING_PARAMS } = http_message_1.HttpMessage;
const { BAD_REQUEST } = http_code_1.HttpCode;
class CreateSectionUseCase {
    constructor() {
        this.sectionService = new section_service_1.SectionService();
    }
    checkParams(section) {
        if (!section || !section.getTitle()) {
            throw new CustomError_1.CustomError(MISSING_PARAMS, BAD_REQUEST, {});
        }
    }
    createSection(section) {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkParams(section);
            yield this.sectionService.createSection(section);
        });
    }
}
exports.CreateSectionUseCase = CreateSectionUseCase;
