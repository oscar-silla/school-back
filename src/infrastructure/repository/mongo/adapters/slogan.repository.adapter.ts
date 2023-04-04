import { SloganRepositoryPort } from "../../../../application/ports/out/slogan.repository.port";
import { Slogan } from "../../../../application/domain/slogan";
import { GeneratedId } from "../../../../application/domain/generated-id";
import { SloganModelMapper } from "../mappers/slogan.model.mapper";
import { SlogansCollection } from "../collections/slogans.collection";
import { GeneratedIdModel } from "../models/generated-id.model";
import { GeneratedIdModelMapper } from "../mappers/generated-id.model.mapper";
import { SloganModel } from "../models/slogan.model";

export class SloganRepositoryAdapter implements SloganRepositoryPort {
  private slogansCollection: SlogansCollection = new SlogansCollection();
  private sloganDaoMapper: SloganModelMapper = new SloganModelMapper();
  private generatedIdDaoMapper: GeneratedIdModelMapper =
    new GeneratedIdModelMapper();

  async save(slogan: Slogan): Promise<GeneratedId> {
    const sloganDao = this.sloganDaoMapper.toSloganDao(slogan);
    const generatedIdDao: GeneratedIdModel = await this.slogansCollection.save(
      sloganDao
    );
    return this.generatedIdDaoMapper.toGeneratedId(generatedIdDao);
  }
  async findAll(): Promise<Slogan[]> {
    const response: SloganModel[] = await this.slogansCollection.findAll();
    return this.sloganDaoMapper.toSlogans(response);
  }
  async findById(id: string): Promise<Slogan> {
    const response: SloganModel = await this.slogansCollection.findById(id);
    return this.sloganDaoMapper.toSlogan(response);
  }
  async modifyOneById(id: string, slogan: Slogan): Promise<void> {
    const sloganDao: SloganModel = this.sloganDaoMapper.toSloganDao(slogan);
    await this.slogansCollection.modifyOneById(id, sloganDao);
  }
  async deleteOneById(id: string): Promise<void> {
    await this.slogansCollection.deleteOneById(id);
  }

  async findByTitle(title: string): Promise<Slogan> {
    const sloganDao: SloganModel = await this.slogansCollection.findByTitle(
      title
    );
    return this.sloganDaoMapper.toSlogan(sloganDao);
  }
}
