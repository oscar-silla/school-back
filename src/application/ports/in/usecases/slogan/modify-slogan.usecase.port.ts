import { Slogan } from "../../../../domain/slogan";

export interface ModifySloganUseCasePort {
  execute(id: string, slogan: Slogan): Promise<void>;
}
