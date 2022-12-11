import { Section } from "../../../../domain/section";

export interface GetSectionUseCasePort {
  getSection(ref: string): Promise<Section>;
}
