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
exports.SectionService = void 0;
const section_repository_adapter_1 = require("../../infrastructure/repository/mongo/adapters/section.repository.adapter");
const http_code_1 = require("../domain/http-code");
const section_1 = require("../domain/section");
const CustomError_1 = require("../exceptions/CustomError");
const generate_reference_util_1 = require("../utils/generate-reference.util");
class SectionService {
    constructor() {
        this.sectionRepository = new section_repository_adapter_1.SectionRepository();
    }
    createSection(section) {
        return __awaiter(this, void 0, void 0, function* () {
            section.setRef((0, generate_reference_util_1.generateReference)(section.getTitle()));
            yield this.sectionRepository.save(section);
        });
    }
    getSections() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.sectionRepository.find();
        });
    }
    getSection(ref) {
        return __awaiter(this, void 0, void 0, function* () {
            const section = yield this.sectionRepository.findOne(ref);
            this.checkIfExistsSection(section);
            return section;
        });
    }
    modifySection(ref, section) {
        return __awaiter(this, void 0, void 0, function* () {
            const sectionToUpdate = yield this.getSection(ref);
            section = this.buildSectionToUpdate(section, sectionToUpdate);
            this.sectionRepository.modifyOne(ref, section);
        });
    }
    checkIfExistsSection(section) {
        if (!section.getRef()) {
            throw new CustomError_1.CustomError("Section not found.", http_code_1.HttpCode.NOT_FOUND, {});
        }
    }
    buildSectionToUpdate(section, sectionToUpdate) {
        return new section_1.Section(section.getTitle() ? section.getTitle() : sectionToUpdate.getTitle(), section.getDescription()
            ? section.getDescription()
            : sectionToUpdate.getDescription(), section.getImg() ? section.getImg() : sectionToUpdate.getImg(), (0, generate_reference_util_1.generateReference)(section.getTitle() ? section.getTitle() : sectionToUpdate.getTitle()));
    }
    deleteSection(ref) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getSection(ref);
            yield this.sectionRepository.deleteOne(ref);
        });
    }
}
exports.SectionService = SectionService;
