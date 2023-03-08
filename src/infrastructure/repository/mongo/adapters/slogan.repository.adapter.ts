import { SloganRepositoryPort } from "../../../../application/ports/out/slogan.repository.port";
import { Slogan } from "../../../../application/domain/slogan";
import { GeneratedId } from "../../../../application/domain/generated-id";

export class SloganRepositoryAdapter implements SloganRepositoryPort {
  save(slogan: Slogan): Promise<GeneratedId> {
    return Promise.resolve(undefined);
  }
}
