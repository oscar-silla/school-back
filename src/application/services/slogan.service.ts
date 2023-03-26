import { SloganServicePort } from "../ports/in/services/slogan.service.port";
import { Slogan } from "../domain/slogan";
import { GeneratedId } from "../domain/generated-id";
import { SloganRepositoryPort } from "../ports/out/slogan.repository.port";
import { SloganRepositoryAdapter } from "../../infrastructure/repository/mongo/adapters/slogan.repository.adapter";
import { CustomError } from "../exceptions/CustomError";
import { HttpMessage } from "../domain/http-message";
import { HttpStatus } from "../domain/http-status";

export class SloganService implements SloganServicePort {
  private sloganRepository: SloganRepositoryPort =
    new SloganRepositoryAdapter();

  async save(slogan: Slogan): Promise<GeneratedId> {
    return await this.sloganRepository.save(slogan);
  }
  async findAll(): Promise<Slogan[]> {
    return await this.sloganRepository.findAll();
  }
  async findById(id: string): Promise<Slogan> {
    const slogan: Slogan = await this.sloganRepository.findById(id);
    this.checkIfSloganIsPresent(slogan);
    return slogan;
  }

  private checkIfSloganIsPresent(slogan: Slogan) {
    if (!slogan.getId()) {
      throw new CustomError(HttpMessage.NOT_FOUND, HttpStatus.NOT_FOUND, {});
    }
  }
}
