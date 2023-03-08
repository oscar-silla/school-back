import { GeneratedId } from "../../../../application/domain/generated-id";
import { LastNew } from "../../../../application/domain/last-new";
import { LastNewRepositoryPort } from "../../../../application/ports/out/last-new.repository.port";
import { LastNewsCollection } from "../collections/last-news.collection";
import { GeneratedIdModelMapper } from "../mappers/generated-id.model.mapper";
import { LastNewMapperModel } from "../mappers/last-new.model.mapper";
import { GeneratedIdDao } from "../models/generated-id.dao";
import { LastNewDao } from "../models/last-new.dao";

export class LastNewRepositoryAdapter implements LastNewRepositoryPort {
  private lastNewsCollection = new LastNewsCollection();
  private lastNewModelMapper = new LastNewMapperModel();
  private generatedIdMapper = new GeneratedIdModelMapper();

  async save(lastNew: LastNew): Promise<GeneratedId> {
    const response: GeneratedIdDao = await this.lastNewsCollection.save(
      lastNew
    );
    return this.generatedIdMapper.toGeneratedId(response);
  }

  async find(limit: number, page: number): Promise<LastNew[]> {
    const response: LastNewDao[] = await this.lastNewsCollection.find(
      limit,
      page
    );
    return this.lastNewModelMapper.toLastNews(response);
  }

  async findOne(id: string): Promise<LastNew> {
    const response: LastNewDao = await this.lastNewsCollection.findOne(id);
    return this.lastNewModelMapper.toLastNew(response);
  }

  async modifyOne(id: string, lastNew: LastNew): Promise<void> {
    await this.lastNewsCollection.modifyOne(id, lastNew);
  }

  async deleteOne(id: string): Promise<void> {
    await this.lastNewsCollection.deleteOne(id);
  }
}
