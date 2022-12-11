import { Section } from "../../domain/section";

export interface SectionRepositoryPort {
  save(section: Section): Promise<void>;
  find(): Promise<Section[]>;
  findOneByTitle(ref: string): Promise<Section>;
}
