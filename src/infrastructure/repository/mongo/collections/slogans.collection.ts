import { SloganDao } from "../models/slogan.dao";
import { GeneratedIdModel } from "../models/generated-id.model";

export class SlogansCollection {
  async save(sloganDao: SloganDao): Promise<GeneratedIdModel> {
    const { mongo } = global.database;
    return await mongo.collection("slogans").insertOne(sloganDao);
  }
  async findAll(): Promise<SloganDao[]> {
    const { mongo } = global.database;
    return await mongo.collection("slogans").find({}).toArray();
  }
  async findById(id: string): Promise<SloganDao> {
    const { ObjectId, mongo } = global.database;
    return await mongo.collection("slogans").findOne({ _id: ObjectId(id) });
  }
  async findByTitle(title: string) {
    const { mongo } = global.database;
    return await mongo.collection("slogans").findOne({ title });
  }
  async modifyOneById(id: string, slogan: SloganDao): Promise<void> {
    const { ObjectId, mongo } = global.database;
    await mongo
      .collection("slogans")
      .updateOne({ _id: ObjectId(id) }, { $set: slogan });
  }
  async deleteOneById(id: string): Promise<void> {
    const { ObjectId, mongo } = global.database;
    await mongo.collection("slogans").deleteOne({ _id: ObjectId(id) });
  }
}
