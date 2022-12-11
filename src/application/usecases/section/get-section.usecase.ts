import { Section } from "../../domain/section";
import { CustomError } from "../../exceptions/CustomError";
import { GetSectionUseCasePort } from "../../ports/in/usecases/section/get-section.usecase.port";
import { SectionService } from "../../services/section.service";

export class GetSectionUseCase implements GetSectionUseCasePort {
  private sectionService = new SectionService();

  private checkParams(ref: string) {
    if (!ref) {
      throw new CustomError("Missing path params.", 400, {});
    }
  }

  async getSection(ref: string): Promise<Section> {
    this.checkParams(ref);
    const section = await this.sectionService.getSection(ref);
    return section;
  }
}
