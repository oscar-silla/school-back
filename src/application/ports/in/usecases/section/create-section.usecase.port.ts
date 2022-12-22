import { Section } from "../../../../domain/section";

export interface CreateSectionUseCasePort {
  createSection(section: Section): Promise<void>;
}
