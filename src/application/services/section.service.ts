import { SectionRepository } from "../../infrastructure/repository/mongo/adapters/section.repository.adapter";
import { HttpStatus } from "../domain/http-status";
import { Section } from "../domain/section";
import { CustomError } from "../exceptions/CustomError";
import { SectionServicePort } from "../ports/in/services/section.service.port";
import { generateReference } from "../utils/generate-reference.util";
import { HttpMessage } from "../domain/http-message";

export class SectionService implements SectionServicePort {
  private sectionRepository = new SectionRepository();

  async createSection(section: Section): Promise<void> {
    section.setRef(generateReference(section.getTitle()));
    await this.checkIfExistsSection(section);
    await this.sectionRepository.save(section);
  }

  async getSections(): Promise<Section[]> {
    const sections: Section[] = await this.sectionRepository.find();
    this.checkSectionListSize(sections);
    return sections;
  }

  async getSection(ref: string): Promise<Section> {
    const section: Section = await this.sectionRepository.findOne(ref);
    this.checkIfNotExistsSection(section);
    return section;
  }

  async modifySection(ref: string, section: Section): Promise<void> {
    const sectionToUpdate: Section = await this.getSection(ref);
    section = this.buildSectionPayload(section, sectionToUpdate);
    await this.checkIfExistsSectionToUpdate(section, ref);
    await this.sectionRepository.modifyOne(section);
  }

  private checkSectionListSize(sections: Section[]): void {
    if (sections.length === 0) {
      throw new CustomError(HttpMessage.NOT_FOUND, HttpStatus.NOT_FOUND, {});
    }
  }

  private async checkIfExistsSectionToUpdate(
    section: Section,
    ref: string
  ): Promise<void> {
    const sectionToUpdate: Section = await this.sectionRepository.findOne(
      section.getRef()
    );
    if (
      this.existsSectionToUpdateButNotWithSameRefProvided(sectionToUpdate, ref)
    ) {
      const existsSection: Section = await this.sectionRepository.findOne(
        section.getRef()
      );
      if (existsSection.getRef()) {
        throw new CustomError(HttpMessage.CONFLICT, HttpStatus.CONFLICT, {});
      }
    }
  }

  private existsSectionToUpdateButNotWithSameRefProvided(
    existsSection: Section,
    ref: string
  ): boolean {
    return !!(existsSection?.getRef() && existsSection.getRef() !== ref);
  }

  private async checkIfExistsSection(section: Section): Promise<void> {
    const existsSection = await this.sectionRepository.findOne(
      section.getRef()
    );
    if (existsSection.getRef()) {
      throw new CustomError(HttpMessage.CONFLICT, HttpStatus.CONFLICT, {});
    }
  }

  private checkIfNotExistsSection(section: Section): void {
    if (!section.getRef()) {
      throw new CustomError(HttpMessage.NOT_FOUND, HttpStatus.NOT_FOUND, {});
    }
  }

  private buildSectionPayload(
    section: Section,
    sectionToUpdate: Section
  ): Section {
    const sectionPayload: Section = new Section();
    sectionPayload.setTitle(
      section.getTitle() ? section.getTitle() : sectionToUpdate.getTitle()
    );
    sectionPayload.setDescription(
      section?.getDescription() ?? sectionToUpdate?.getDescription() ?? ""
    );
    sectionPayload.setImg(section?.getImg() ?? sectionToUpdate?.getImg() ?? "");
    sectionPayload.setRef(
      generateReference(section?.getTitle() ?? sectionToUpdate?.getTitle())
    );
    return sectionPayload;
  }

  async deleteSection(ref: string): Promise<void> {
    await this.getSection(ref);
    await this.sectionRepository.deleteOne(ref);
  }
}
