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
    const sloganModel: SloganModel = this.sloganDaoMapper.toSloganModel(slogan);
    const generatedIdModel: GeneratedIdModel =
      await this.slogansCollection.save(sloganModel);
    return this.generatedIdDaoMapper.toGeneratedId(generatedIdModel);
  }
  async findFirst(): Promise<Slogan> {
    const response: SloganModel = await this.slogansCollection.findFirst();
    return this.sloganDaoMapper.toSlogan(response);
  }
  async findById(id: string): Promise<Slogan> {
    const response: SloganModel = await this.slogansCollection.findById(id);
    return this.sloganDaoMapper.toSlogan(response);
  }
  async modifyOneById(id: string, slogan: Slogan): Promise<void> {
    const sloganModel: SloganModel = this.sloganDaoMapper.toSloganModel(slogan);
    await this.slogansCollection.modifyOneById(id, sloganModel);
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
