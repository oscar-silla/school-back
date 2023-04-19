import { GeneratedId } from "../../../../application/domain/generated-id";
import { LastNew } from "../../../../application/domain/last-new";
import { LastNewRepositoryPort } from "../../../../application/ports/out/last-new.repository.port";
import { LastNewsCollection } from "../collections/last-news.collection";
import { GeneratedIdModelMapper } from "../mappers/generated-id.model.mapper";
import { LastNewModelMapper } from "../mappers/last-new.model.mapper";
import { GeneratedIdModel } from "../models/generated-id.model";
import { LastNewModel } from "../models/last-new.model";

export class LastNewRepositoryAdapter implements LastNewRepositoryPort {
  private lastNewsCollection = new LastNewsCollection();
  private lastNewModelMapper = new LastNewModelMapper();
  private generatedIdMapper = new GeneratedIdModelMapper();

  async save(lastNew: LastNew): Promise<GeneratedId> {
    const lastNewModel: LastNewModel =
      this.lastNewModelMapper.toLastNewModel(lastNew)!;
    const response: GeneratedIdModel = await this.lastNewsCollection.save(
      lastNewModel
    );
    return this.generatedIdMapper.toGeneratedId(response);
  }

  async find(limit: number, page: number): Promise<LastNew[] | null> {
    const response: LastNewModel[] | null = await this.lastNewsCollection.find(
      limit,
      page
    );
    return this.lastNewModelMapper.toLastNews(response);
  }

  async findById(id: string): Promise<LastNew | null> {
    const response: LastNewModel | null =
      await this.lastNewsCollection.findById(id);
    return this.lastNewModelMapper.toLastNew(response);
  }

  async findByTitle(title: string): Promise<LastNew | null> {
    const response: LastNewModel | null =
      await this.lastNewsCollection.findByTitle(title);
    return this.lastNewModelMapper.toLastNew(response);
  }

  async modifyOne(id: string, lastNew: LastNew): Promise<void> {
    const lastNewModel: LastNewModel =
      this.lastNewModelMapper.toLastNewModel(lastNew)!;
    await this.lastNewsCollection.modifyOne(id, lastNewModel);
  }

  async deleteOne(id: string): Promise<void> {
    await this.lastNewsCollection.deleteOne(id);
  }
}
