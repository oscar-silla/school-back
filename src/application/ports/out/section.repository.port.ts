import { Section } from "../../domain/section";

export interface SectionRepositoryPort {
  save(section: Section): Promise<void>;
  find(): Promise<Section[]>;
  findOne(ref: string): Promise<Section>;
  modifyOne(ref: string, section: Section): Promise<void>;
}
