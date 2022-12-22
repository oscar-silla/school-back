import { Section } from "../../../../domain/section";

export interface ModifySectionUseCasePort {
  modifySection(ref: string, section: Section): Promise<void>;
}
