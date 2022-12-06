import { Section } from "../../../../application/domain/section";
import { SectionRepositoryPort } from "../../../../application/ports/out/section.repository.port";
import { SectionsCollection } from "../collections/sections.collection";
import { SectionMapperModel } from "../mappers/section.mapper.model";
import { SectionModel } from "../models/section.model";

export class SectionRepository implements SectionRepositoryPort {
  private sectionsCollection = new SectionsCollection();
  private sectionMapperModel = new SectionMapperModel();

  async save(section: Section): Promise<void> {
    await this.sectionsCollection.save(section);
  }
  async find(): Promise<Section[]> {
    const response: SectionModel[] = await this.sectionsCollection.find();
    return this.sectionMapperModel.toSections(response);
  }
}
