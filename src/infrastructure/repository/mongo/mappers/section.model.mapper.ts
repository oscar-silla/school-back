import { Section } from "../../../../application/domain/section";
import { SectionModel } from "../models/section.model";

export class SectionModelMapper {
  toSectionModel(section: Section | any): SectionModel {
    const sectionModel: SectionModel = new SectionModel();
    if (section instanceof Section) {
      sectionModel.setTitle(section?.getTitle() ?? "");
      sectionModel.setDescription(section?.getDescription() ?? "");
      sectionModel.setImg(section?.getImg() ?? "");
      sectionModel.setRef(section?.getRef() ?? "");
    } else {
      sectionModel.setId(section?._id ?? "");
      sectionModel.setTitle(section?.title ?? "");
      sectionModel.setDescription(section?.description ?? "");
      sectionModel.setImg(section?.img ?? "");
      sectionModel.setRef(section?.ref ?? "");
    }
    return sectionModel;
  }

  toSectionModels(sections: Section[] | any[]): SectionModel[] {
    return sections.map((section: Section | any) =>
      this.toSectionModel(section)
    );
  }

  toSection(sectionModel: SectionModel): Section {
    const section: Section = new Section();
    section.setId(sectionModel?.getId() ?? "");
    section.setTitle(sectionModel?.getTitle() ?? "");
    section.setDescription(sectionModel?.getDescription() ?? "");
    section.setImg(sectionModel?.getImg() ?? "");
    section.setRef(sectionModel?.getRef() ?? "");
    return section;
  }

  toSections(sectionModels: SectionModel[]): Section[] {
    return sectionModels.map((sectionModel) => this.toSection(sectionModel));
  }
}
