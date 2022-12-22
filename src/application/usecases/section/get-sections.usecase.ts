import { Section } from "../../domain/section";
import { GetSectionsUseCasePort } from "../../ports/in/usecases/section/get-sections.usecase.port";
import { SectionService } from "../../services/section.service";

export class GetSectionsUseCase implements GetSectionsUseCasePort {
  private sectionService = new SectionService();

  async getSections(): Promise<Section[]> {
    return await this.sectionService.getSections();
  }
}
