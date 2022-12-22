import { Section } from "../../../../domain/section";

export interface GetSectionsUseCasePort {
  getSections(): Promise<Section[]>;
}
