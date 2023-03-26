import { Slogan } from "../../../domain/slogan";
import { GeneratedId } from "../../../domain/generated-id";

export interface SloganServicePort {
  createSlogan(slogan: Slogan): Promise<GeneratedId>;
  findSlogans(): Promise<Slogan[]>;
  findSloganById(id: string): Promise<Slogan>;
  modifySloganById(id: string, slogan: Slogan): Promise<void>;
}
