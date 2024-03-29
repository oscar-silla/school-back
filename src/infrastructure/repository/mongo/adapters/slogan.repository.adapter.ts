import { SloganRepositoryPort } from "../../../../application/ports/out/repository/slogan.repository.port";
import { Slogan } from "../../../../application/domain/slogan";
import { GeneratedId } from "../../../../application/domain/generated-id";
import { SloganModelMapper } from "../mappers/slogan.model.mapper";
import { SlogansCollection } from "../collections/slogans.collection";
import { GeneratedIdModel } from "../models/generated-id.model";
import { GeneratedIdModelMapper } from "../mappers/generated-id.model.mapper";
import { SloganModel } from "../models/slogan.model";
import { SlogansCollectionPort } from "../../../../application/ports/out/collection/slogans.collection.port";

export class SloganRepositoryAdapter implements SloganRepositoryPort {
  private slogansCollection: SlogansCollectionPort = new SlogansCollection();
  private sloganDaoMapper: SloganModelMapper = new SloganModelMapper();
  private generatedIdDaoMapper: GeneratedIdModelMapper =
    new GeneratedIdModelMapper();

  async save(slogan: Slogan): Promise<GeneratedId> {
    const sloganModel: SloganModel =
      this.sloganDaoMapper.toSloganModel(slogan)!;
    const generatedIdModel: GeneratedIdModel =
      await this.slogansCollection.save(sloganModel);
    return this.generatedIdDaoMapper.toGeneratedId(generatedIdModel);
  }
  async findFirst(): Promise<Slogan | null> {
    const response: SloganModel | null =
      await this.slogansCollection.findFirst();
    return this.sloganDaoMapper.toSlogan(response);
  }
  async findById(id: string): Promise<Slogan | null> {
    const response: SloganModel | null = await this.slogansCollection.findById(
      id
    );
    return this.sloganDaoMapper.toSlogan(response);
  }
  async findByTitle(title: string): Promise<Slogan | null> {
    const sloganDao: SloganModel | null =
      await this.slogansCollection.findByTitle(title);
    return this.sloganDaoMapper.toSlogan(sloganDao);
  }
  async modifyOneById(id: string, slogan: Slogan): Promise<void> {
    const sloganModel: SloganModel =
      this.sloganDaoMapper.toSloganModel(slogan)!;
    await this.slogansCollection.modifyOneById(id, sloganModel);
  }
  async deleteOneById(id: string): Promise<void> {
    await this.slogansCollection.deleteOneById(id);
  }
}
