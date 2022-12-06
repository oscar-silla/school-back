import { Section } from "../../../../application/domain/section";
import { SectionModel } from "../models/section.model";

export class SectionsCollection {
  async save(section: Section) {
    const { mongo } = global.database;
    await mongo.collection("sections").insertOne(section);
  }
  async find(): Promise<SectionModel[]> {
    const { mongo } = global.database;
    return await mongo.collection("sections").find({}).toArray();
  }
}
