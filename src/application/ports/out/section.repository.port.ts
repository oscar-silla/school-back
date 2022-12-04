import { Section } from "../../domain/section";

export interface SectionRepositoryPort {
  save(section: Section): Promise<void>;
}
