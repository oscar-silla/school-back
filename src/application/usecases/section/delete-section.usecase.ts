import { HttpStatus } from "../../domain/http-status";
import { HttpMessage } from "../../domain/http-message";
import { CustomError } from "../../exceptions/CustomError";
import { DeleteSectionUseCasePort } from "../../ports/in/usecases/section/delete-section.usecase.port";
import { SectionService } from "../../services/section.service";

const { MISSING_PARAMS } = HttpMessage;
const { BAD_REQUEST } = HttpStatus;

export class DeleteSectionUseCase implements DeleteSectionUseCasePort {
  private sectionService = new SectionService();

  private checkPathParams(ref: string) {
    if (!ref) {
      throw new CustomError(MISSING_PARAMS, BAD_REQUEST, {});
    }
  }

  async deleteSection(ref: string): Promise<void> {
    this.checkPathParams(ref);
    await this.sectionService.deleteSection(ref);
  }
}
