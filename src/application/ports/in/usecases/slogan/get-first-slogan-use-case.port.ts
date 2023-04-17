import { Slogan } from "../../../../domain/slogan";

export interface GetFirstSloganUseCasePort {
  execute(): Promise<Slogan>;
}
