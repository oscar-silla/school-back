"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionMapperModel = void 0;
const section_1 = require("../../../../application/domain/section");
class SectionMapperModel {
    toSection(sectionModel) {
        const { title, description, img, ref } = sectionModel;
        return new section_1.Section(title, description !== null && description !== void 0 ? description : "", img !== null && img !== void 0 ? img : "", ref);
    }
    toSections(sectionModels) {
        return sectionModels.map((sectionModel) => this.toSection(sectionModel));
    }
}
exports.SectionMapperModel = SectionMapperModel;
