import { SloganDao } from "../models/slogan.dao";
import { GeneratedIdDao } from "../models/generated-id.dao";

export class SlogansCollection {
  async save(sloganDao: SloganDao): Promise<GeneratedIdDao> {
    const { mongo } = global.database;
    return await mongo.collection("slogans").insertOne(sloganDao);
  }
  async findAll(): Promise<SloganDao[]> {
    const { mongo } = global.database;
    return await mongo.collection("slogans").find({}).toArray();
  }
}
