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
}
exports.SectionService = SectionService;
