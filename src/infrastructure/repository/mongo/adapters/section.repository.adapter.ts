import { Section } from "../../../../application/domain/section";
import { SectionRepositoryPort } from "../../../../application/ports/out/section.repository.port";
import { SectionsCollection } from "../collections/sections.collection";
import { SectionModelMapper } from "../mappers/section.model.mapper";
import { SectionDao } from "../models/section.dao";

export class SectionRepository implements SectionRepositoryPort {
  private sectionsCollection = new SectionsCollection();
  private sectionModelMapper = new SectionModelMapper();

  async save(section: Section): Promise<void> {
    return await this.sectionsCollection.save(section);
  }
  async find(): Promise<Section[]> {
    const response: SectionDao[] = await this.sectionsCollection.find();
    return this.sectionModelMapper.toSections(response);
  }
  async findOne(ref: string): Promise<Section> {
    const response: SectionDao = await this.sectionsCollection.findOne(ref);
    const section: Section = this.sectionModelMapper.toSection(response);
    return section;
  }
  async modifyOne(ref: string, section: Section): Promise<void> {
    return await this.sectionsCollection.modifyOne(ref, section);
  }
  async deleteOne(ref: string): Promise<void> {
    await this.sectionsCollection.deleteOne(ref);
  }
}
