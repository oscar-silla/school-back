import { SloganServicePort } from "../ports/in/services/slogan.service.port";
import { Slogan } from "../domain/slogan";
import { GeneratedId } from "../domain/generated-id";

export class SloganService implements SloganServicePort {
  save(slogan: Slogan): Promise<GeneratedId> {
    return Promise.resolve(undefined);
  }
}
