import { Slogan } from "../../../../domain/slogan";

export interface GetSloganUseCasePort {
  execute(id: string): Promise<Slogan>;
}
