import { Slogan } from "../../../domain/slogan";
import { GeneratedId } from "../../../domain/generated-id";

export interface SloganServicePort {
  save(slogan: Slogan): Promise<GeneratedId>;
}
