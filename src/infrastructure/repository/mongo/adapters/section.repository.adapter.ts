import { Section } from "../../../../application/domain/section";
import { SectionRepositoryPort } from "../../../../application/ports/out/section.repository.port";
import { SectionsCollection } from "../collections/sections.collection";
import { SectionModelMapper } from "../mappers/section.model.mapper";
import { SectionModel } from "../models/section.model";

export class SectionRepository implements SectionRepositoryPort {
  private sectionsCollection = new SectionsCollection();
  private sectionModelMapper = new SectionModelMapper();

  async save(section: Section): Promise<void> {
    const sectionModel: SectionModel =
      this.sectionModelMapper.toSectionModel(section);
    await this.sectionsCollection.save(sectionModel);
  }
  async find(): Promise<Section[]> {
    const response: SectionModel[] = await this.sectionsCollection.find();
    return this.sectionModelMapper.toSections(response);
  }
  async findOne(ref: string): Promise<Section> {
    const response: SectionModel = await this.sectionsCollection.findOne(ref);
    return this.sectionModelMapper.toSection(response);
  }
  async modifyOne(section: Section): Promise<void> {
    const sectionModel: SectionModel =
      this.sectionModelMapper.toSectionModel(section);
    return await this.sectionsCollection.modifyOne(sectionModel);
  }
  async deleteOne(ref: string): Promise<void> {
    await this.sectionsCollection.deleteOne(ref);
  }
}
