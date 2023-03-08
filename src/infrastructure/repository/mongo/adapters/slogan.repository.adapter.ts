import { SloganRepositoryPort } from "../../../../application/ports/out/slogan.repository.port";
import { Slogan } from "../../../../application/domain/slogan";
import { GeneratedId } from "../../../../application/domain/generated-id";
import { SloganDaoMapper } from "../mappers/slogan.dao.mapper";

export class SloganRepositoryAdapter implements SloganRepositoryPort {
  private sloganDaoMapper: SloganDaoMapper = new SloganDaoMapper();
  async save(slogan: Slogan): Promise<GeneratedId> {
    const sloganDao = this.sloganDaoMapper.toSloganDao(slogan);
  }
}
