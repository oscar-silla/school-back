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
exports.SectionRepository = void 0;
const sections_collection_1 = require("../collections/sections.collection");
const section_mapper_model_1 = require("../mappers/section.mapper.model");
class SectionRepository {
    constructor() {
        this.sectionsCollection = new sections_collection_1.SectionsCollection();
        this.sectionMapperModel = new section_mapper_model_1.SectionMapperModel();
    }
    save(section) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.sectionsCollection.save(section);
        });
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sectionsCollection.find();
            return this.sectionMapperModel.toSections(response);
        });
    }
    findOne(ref) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sectionsCollection.findOne(ref);
            const section = this.sectionMapperModel.toSection(response);
            return section;
        });
    }
    modifyOne(ref, section) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.sectionsCollection.modifyOne(ref, section);
        });
    }
    deleteOne(ref) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sectionsCollection.deleteOne(ref);
        });
    }
}
exports.SectionRepository = SectionRepository;
