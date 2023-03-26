import { Section } from "../../../../application/domain/section";
import { SectionDao } from "../models/section.dao";

export class SectionDaoMapper {
  toSection(sectionModel: SectionDao): Section {
    const { title, description, img, ref } = sectionModel ?? {};
    return new Section(title ?? "", description ?? "", img ?? "", ref ?? "");
  }

  toSections(sectionModels: SectionDao[]): Section[] {
    return sectionModels.map((sectionModel) => this.toSection(sectionModel));
  }
}
