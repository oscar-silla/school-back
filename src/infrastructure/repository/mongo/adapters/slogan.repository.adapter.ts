import { SloganRepositoryPort } from "../../../../application/ports/out/slogan.repository.port";

export class SloganRepositoryAdapter implements SloganRepositoryPort {
  save(slogan: Slogan): Promise<GeneratedId> {
    return Promise.resolve(undefined);
  }
}
