import { GeneratedIdModel } from "../models/generated-id.model";
import { LastNewModel } from "../models/last-new.model";
import { GeneratedIdModelMapper } from "../mappers/generated-id.model.mapper";
import { LastNewModelMapper } from "../mappers/last-new.model.mapper";
import { LastNewsCollectionPort } from "../../../../application/ports/out/collection/last-news.collection.port";

export class LastNewsCollection implements LastNewsCollectionPort {
  private lastNewModelMapper: LastNewModelMapper = new LastNewModelMapper();
  private generateIdModelMapper: GeneratedIdModelMapper =
    new GeneratedIdModelMapper();

  async save(lastNewModel: LastNewModel): Promise<GeneratedIdModel> {
    const { mongo } = global.database;
    return this.generateIdModelMapper.toGenerateIdModel(
      await mongo.collection("last_news").insertOne(lastNewModel)
    );
  }

  async find(limit: number, page: number): Promise<LastNewModel[] | null> {
    const { mongo } = global.database;
    return this.lastNewModelMapper.toLastNewModels(
      await mongo
        .collection("last_news")
        .find({})
        .limit(limit)
        .skip(limit * page)
        .toArray()
    );
  }

  async findById(id: string): Promise<LastNewModel | null> {
    const { ObjectId, mongo } = global.database;
    return this.lastNewModelMapper.toLastNewModel(
      await mongo.collection("last_news").findOne({ _id: ObjectId(id) })
    );
  }

  async findByTitle(title: string): Promise<LastNewModel | null> {
    const { mongo } = global.database;
    return this.lastNewModelMapper.toLastNewModel(
      await mongo.collection("last_news").findOne({ title: title })
    );
  }

  async modifyOne(id: string, lastNewModel: LastNewModel): Promise<void> {
    const { ObjectId, mongo } = global.database;
    return await mongo
      .collection("last_news")
      .updateOne({ _id: ObjectId(id) }, { $set: lastNewModel });
  }

  async deleteOne(id: string): Promise<void> {
    const { ObjectId, mongo } = global.database;
    await mongo.collection("last_news").deleteOne({ _id: ObjectId(id) });
  }
}
