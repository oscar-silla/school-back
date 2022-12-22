import { SectionRepository } from "../../infrastructure/repository/mongo/adapters/section.repository.adapter";
import { HttpCode } from "../domain/http-code";
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
    const section: Section = await this.sectionRepository.findOne(ref);
    this.checkIfExistsSection(section);
    return section;
  }

  async modifySection(ref: string, section: Section): Promise<void> {
    const sectionToUpdate = await this.getSection(ref);
    section = this.buildSectionToUpdate(section, sectionToUpdate);
    this.sectionRepository.modifyOne(ref, section);
  }

  private checkIfExistsSection(section: Section): void {
    if (!section.getRef()) {
      throw new CustomError("Section not found.", HttpCode.NOT_FOUND, {});
    }
  }

  private buildSectionToUpdate(
    section: Section,
    sectionToUpdate: Section
  ): Section {
    return new Section(
      section.getTitle() ? section.getTitle() : sectionToUpdate.getTitle(),
      section.getDescription()
        ? section.getDescription()
        : sectionToUpdate.getDescription(),
      section.getImg() ? section.getImg() : sectionToUpdate.getImg(),
      generateReference(
        section.getTitle() ? section.getTitle() : sectionToUpdate.getTitle()
      )
    );
  }

  async deleteSection(ref: string): Promise<void> {
    await this.getSection(ref);
    await this.sectionRepository.deleteOne(ref);
  }
}
