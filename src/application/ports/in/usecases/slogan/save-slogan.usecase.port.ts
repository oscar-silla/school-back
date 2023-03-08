import { Slogan } from "../../../../domain/slogan";
import { GeneratedId } from "../../../../domain/generated-id";

export interface SaveSloganUseCasePort {
  execute(slogan: Slogan): Promise<GeneratedId>;
}
