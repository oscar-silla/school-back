import { Section } from "../../../../application/domain/section";

export class SectionsCollection {
  async save(section: Section) {
    const { mongo } = global.database;
    await mongo.collection("sections").insertOne(section);
  }
}
