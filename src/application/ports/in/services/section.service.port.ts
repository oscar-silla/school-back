import { Section } from "../../../domain/section";

export interface SectionServicePort {
  createSection(section: Section): Promise<void>;
}
