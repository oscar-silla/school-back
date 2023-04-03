import { Section } from "../../../domain/section";

export interface SectionServicePort {
  createSection(section: Section): Promise<void>;
  getSection(ref: string): Promise<Section>;
  getSections(): Promise<Section[]>;
  modifySection(ref: string, section: Section): Promise<void>;
  deleteSection(ref: string): Promise<void>;
}
