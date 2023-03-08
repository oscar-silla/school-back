import { Section } from "../../../../application/domain/section";
import { SectionDao } from "../models/section.dao";

export class SectionsCollection {
  async save(section: Section): Promise<void> {
    const { mongo } = global.database;
    return await mongo.collection("sections").insertOne(section);
  }
  async find(): Promise<SectionDao[]> {
    const { mongo } = global.database;
    return await mongo.collection("sections").find({}).toArray();
  }
  async findOne(ref: string): Promise<SectionDao> {
    const { mongo } = global.database;
    return await mongo.collection("sections").findOne({ ref });
  }
  async modifyOne(ref: string, section: Section): Promise<void> {
    const { mongo } = global.database;
    return await mongo
      .collection("sections")
      .updateOne({ ref }, { $set: section });
  }
  async deleteOne(ref: string): Promise<void> {
    const { mongo } = global.database;
    await mongo.collection("sections").deleteOne({ ref });
  }
}
