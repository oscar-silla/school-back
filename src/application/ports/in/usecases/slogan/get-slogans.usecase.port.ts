import { Slogan } from "../../../../domain/slogan";

export interface GetSlogansUseCasePort {
  execute(): Promise<Slogan[]>;
}
