"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionMapperModel = void 0;
const section_1 = require("../../../../application/domain/section");
class SectionMapperModel {
    toSection(sectionModel) {
        const { title, description, img, ref } = sectionModel !== null && sectionModel !== void 0 ? sectionModel : {};
        return new section_1.Section(title !== null && title !== void 0 ? title : "", description !== null && description !== void 0 ? description : "", img !== null && img !== void 0 ? img : "", ref !== null && ref !== void 0 ? ref : "");
    }
    toSections(sectionModels) {
        return sectionModels.map((sectionModel) => this.toSection(sectionModel));
    }
}
exports.SectionMapperModel = SectionMapperModel;
