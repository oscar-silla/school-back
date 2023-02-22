import {SectionBody} from "../../../../../external-libraries/openapi/models/SectionBody";
import {SectionResponse} from "../../../../../external-libraries/openapi/models/SectionResponse";
import {Section} from "../../../../application/domain/section";

export class SectionControllerMapper {
    toSection(body: SectionBody) {
        return new Section(body.title, body.description ?? "", body.img ?? "", "");
    }

    toSectionResponse(section: Section): SectionResponse {
        const sectionResponse = new SectionResponse();
        sectionResponse.title = section.getTitle();
        sectionResponse.description = section.getDescription();
        sectionResponse.img = section.getImg();
        sectionResponse.ref = section.getRef();
        return sectionResponse;
    }

    toSectionsResponse(sections: Section[]): SectionResponse[] {
        return sections.map((section) => this.toSectionResponse(section));
    }
}
