import { GeneratedIdModel } from "../models/generated-id.model";
import { LastNewModel } from "../models/last-new.model";
import { GeneratedIdModelMapper } from "../mappers/generated-id.model.mapper";
import { LastNewModelMapper } from "../mappers/last-new.model.mapper";

export class LastNewsCollection {
  private lastNewModelMapper = new LastNewModelMapper();
  private generateIdModelMapper = new GeneratedIdModelMapper();
  async save(lastNewModel: LastNewModel): Promise<GeneratedIdModel> {
    const { mongo } = global.database;
    return this.generateIdModelMapper.toGenerateIdModel(
      await mongo.collection("last_news").insertOne(lastNewModel)
    );
  }

  async find(limit: number, page: number): Promise<LastNewModel[]> {
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

  async findOne(id: string): Promise<LastNewModel> {
    const { ObjectId, mongo } = global.database;
    return this.lastNewModelMapper.toLastNewModel(
      await mongo.collection("last_news").findOne({ _id: ObjectId(id) })
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
