import { Section } from "../../../../application/domain/section";
import { SectionModel } from "../models/section.model";

export class SectionsCollection {
  async save(section: Section): Promise<void> {
    const { mongo } = global.database;
    return await mongo.collection("sections").insertOne(section);
  }
  async find(): Promise<SectionModel[]> {
    const { mongo } = global.database;
    return await mongo.collection("sections").find({}).toArray();
  }
  async findOne(ref: string): Promise<SectionModel> {
    const { mongo } = global.database;
    return await mongo.collection("sections").findOne({ ref });
  }
  async modifyOne(ref: string, section: Section): Promise<void> {
    const { mongo } = global.database;
    return await mongo
      .collection("sections")
      .updateOne({ ref }, { $set: section });
  }
}
