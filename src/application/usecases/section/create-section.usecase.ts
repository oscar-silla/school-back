import { HttpCode } from "../../domain/http-code";
import { HttpMessage } from "../../domain/http-message";
import { Section } from "../../domain/section";
import { CustomError } from "../../exceptions/CustomError";
import { CreateSectionUseCasePort } from "../../ports/in/usecases/section/create-section.usecase.port";
import { SectionService } from "../../services/section.service";
const { MISSING_PARAMS } = HttpMessage;
const { BAD_REQUEST } = HttpCode;

export class CreateSectionUseCase implements CreateSectionUseCasePort {
  private sectionService = new SectionService();
  checkParams(section: Section) {
    if (!section || !section.getTitle()) {
      throw new CustomError(MISSING_PARAMS, BAD_REQUEST, {});
    }
  }

  async createSection(section: Section): Promise<void> {
    this.checkParams(section);
    await this.sectionService.createSection(section);
  }
}
