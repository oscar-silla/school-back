import { SectionBody } from "../../../../../external-libraries/openapi";
import { Section } from "../../../../application/domain/section";

export class SectionControllerMapper {
  toSection(body: SectionBody) {
    return new Section(body.title, body.description ?? "", body.img ?? "", "");
  }
}
