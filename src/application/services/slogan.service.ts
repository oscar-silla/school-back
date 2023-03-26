import { SloganServicePort } from "../ports/in/services/slogan.service.port";
import { Slogan } from "../domain/slogan";
import { GeneratedId } from "../domain/generated-id";
import { SloganRepositoryPort } from "../ports/out/slogan.repository.port";
import { SloganRepositoryAdapter } from "../../infrastructure/repository/mongo/adapters/slogan.repository.adapter";

export class SloganService implements SloganServicePort {
  private sloganRepository: SloganRepositoryPort =
    new SloganRepositoryAdapter();

  async save(slogan: Slogan): Promise<GeneratedId> {
    return await this.sloganRepository.save(slogan);
  }
  async findAll(): Promise<Slogan[]> {
    return await this.sloganRepository.findAll();
  }
}
