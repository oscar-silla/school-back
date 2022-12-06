import { SectionRepository } from "../../infrastructure/repository/mongo/adapters/section.repository.adapter";
import { Section } from "../domain/section";
import { SectionServicePort } from "../ports/in/services/section.service.port";
import { generateReference } from "../utils/generate-reference.util";

export class SectionService implements SectionServicePort {
  private sectionRepository = new SectionRepository();

  async createSection(section: Section): Promise<void> {
    section.setRef(generateReference(section.getTitle()));
    await this.sectionRepository.save(section);
  }

  async getSections(): Promise<Section[]> {
    return await this.sectionRepository.find();
  }
}
