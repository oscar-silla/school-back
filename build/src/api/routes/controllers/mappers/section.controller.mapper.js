"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionControllerMapper = void 0;
const SectionResponse_1 = require("../../../../../external-libraries/openapi/models/SectionResponse");
const section_1 = require("../../../../application/domain/section");
class SectionControllerMapper {
    toSection(body) {
        var _a, _b;
        return new section_1.Section(body.title, (_a = body.description) !== null && _a !== void 0 ? _a : "", (_b = body.img) !== null && _b !== void 0 ? _b : "", "");
    }
    toSectionResponse(section) {
        const sectionResponse = new SectionResponse_1.SectionResponse();
        sectionResponse.title = section.getTitle();
        sectionResponse.description = section.getDescription();
        sectionResponse.img = section.getImg();
        sectionResponse.ref = section.getRef();
        return sectionResponse;
    }
    toSectionsResponse(sections) {
        return sections.map((section) => this.toSectionResponse(section));
    }
}
exports.SectionControllerMapper = SectionControllerMapper;
