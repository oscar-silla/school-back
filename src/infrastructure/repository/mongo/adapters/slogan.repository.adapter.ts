import { SloganRepositoryPort } from "../../../../application/ports/out/slogan.repository.port";
import { Slogan } from "../../../../application/domain/slogan";
import { GeneratedId } from "../../../../application/domain/generated-id";
import { SloganDaoMapper } from "../mappers/slogan.dao.mapper";
import { SlogansCollection } from "../collections/slogans.collection";
import { GeneratedIdDao } from "../models/generated-id.dao";
import { GeneratedIdDaoMapper } from "../mappers/generated-id.dao.mapper";
import { SloganDao } from "../models/slogan.dao";

export class SloganRepositoryAdapter implements SloganRepositoryPort {
  private slogansCollection: SlogansCollection = new SlogansCollection();
  private sloganDaoMapper: SloganDaoMapper = new SloganDaoMapper();
  private generatedIdDaoMapper: GeneratedIdDaoMapper =
    new GeneratedIdDaoMapper();

  async save(slogan: Slogan): Promise<GeneratedId> {
    const sloganDao = this.sloganDaoMapper.toSloganDao(slogan);
    const generatedIdDao: GeneratedIdDao = await this.slogansCollection.save(
      sloganDao
    );
    return this.generatedIdDaoMapper.toGeneratedId(generatedIdDao);
  }
  async findAll(): Promise<Slogan[]> {
    const response: SloganDao[] = await this.slogansCollection.findAll();
    return this.sloganDaoMapper.toSlogans(response);
  }
  async findById(id: string): Promise<Slogan> {
    const response: SloganDao = await this.slogansCollection.findById(id);
    return this.sloganDaoMapper.toSlogan(response);
  }
  async modifyOneById(id: string, slogan: Slogan): Promise<void> {
    const sloganDao: SloganDao = this.sloganDaoMapper.toSloganDao(slogan);
    await this.slogansCollection.modifyOneById(id, sloganDao);
  }
}
