import { Section } from "../../../../application/domain/section";
import { SectionModel } from "../models/section.model";

export class SectionMapperModel {
  toSection(sectionModel: SectionModel): Section {
    const { title, description, img, ref } = sectionModel;
    return new Section(title, description ?? "", img ?? "", ref);
  }

  toSections(sectionModels: SectionModel[]): Section[] {
    return sectionModels.map((sectionModel) => this.toSection(sectionModel));
  }
}
