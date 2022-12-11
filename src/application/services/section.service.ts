import { SectionRepository } from "../../infrastructure/repository/mongo/adapters/section.repository.adapter";
import { Section } from "../domain/section";
import { CustomError } from "../exceptions/CustomError";
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

  async getSection(ref: string): Promise<Section> {
    const section: Section = await this.sectionRepository.findOneByTitle(ref);
    this.checkSection(section);
    return section;
  }

  private checkSection(section: Section) {
    if (!section.getRef()) {
      throw new CustomError("Section not found.", 404, {});
    }
  }
}
