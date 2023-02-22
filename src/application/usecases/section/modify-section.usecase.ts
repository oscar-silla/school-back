import { HttpStatus } from "../../domain/http-status";
import { Section } from "../../domain/section";
import { CustomError } from "../../exceptions/CustomError";
import { ModifySectionUseCasePort } from "../../ports/in/usecases/section/modify-section.usecase.port";
import { SectionService } from "../../services/section.service";

export class ModifySectionUseCase implements ModifySectionUseCasePort {
  private sectionService = new SectionService();

  private checkPathParams(ref: string) {
    if (!ref) {
      throw new CustomError("Missing path params.", HttpStatus.BAD_REQUEST, {});
    }
  }

  private checkBodyParams(section: Section) {
    if (!section.getTitle() && !section.getDescription() && !section.getImg()) {
      throw new CustomError("Missing body params.", HttpStatus.BAD_REQUEST, {});
    }
  }

  private checkParams(ref: string, section: Section) {
    this.checkPathParams(ref);
    this.checkBodyParams(section);
  }

  async modifySection(ref: string, section: Section): Promise<void> {
    this.checkParams(ref, section);
    await this.sectionService.modifySection(ref, section);
  }
}
