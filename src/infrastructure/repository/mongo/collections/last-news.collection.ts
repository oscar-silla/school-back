import { LastNew } from "../../../../application/domain/last-new";
import { GeneratedIdDao } from "../models/generated-id.dao";
import { LastNewDao } from "../models/last-new.dao";

export class LastNewsCollection {
  async save(lastNew: LastNew): Promise<GeneratedIdDao> {
    const { mongo } = global.database;
    return await mongo.collection("last_news").insertOne(lastNew);
  }

  async find(limit: number, page: number): Promise<LastNewDao[]> {
    const { mongo } = global.database;
    return await mongo
      .collection("last_news")
      .find({})
      .limit(limit)
      .skip(limit * page)
      .toArray();
  }

  async findOne(id: string): Promise<LastNewDao> {
    const { ObjectId, mongo } = global.database;
    return await mongo.collection("last_news").findOne({ _id: ObjectId(id) });
  }

  async modifyOne(id: string, lastNew: LastNew): Promise<void> {
    const { ObjectId, mongo } = global.database;
    return await mongo
      .collection("last_news")
      .updateOne({ _id: ObjectId(id) }, { $set: lastNew });
  }

  async deleteOne(id: string): Promise<void> {
    const { ObjectId, mongo } = global.database;
    return await mongo.collection("last_news").deleteOne({ _id: ObjectId(id) });
  }
}
