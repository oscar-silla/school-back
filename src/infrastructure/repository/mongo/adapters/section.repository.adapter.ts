import { Section } from "../../../../application/domain/section";
import { SectionRepositoryPort } from "../../../../application/ports/out/section.repository.port";
import { SectionsCollection } from "../collections/sections.collection";

export class SectionRepository implements SectionRepositoryPort {
  private sectionsCollection = new SectionsCollection();

  async save(section: Section): Promise<void> {
    await this.sectionsCollection.save(section);
  }
}
