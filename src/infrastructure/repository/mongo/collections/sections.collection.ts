import { SectionModel } from "../models/section.model";
import { SectionModelMapper } from "../mappers/section.model.mapper";

export class SectionsCollection {
  private sectionModelMapper = new SectionModelMapper();
  async save(sectionModel: SectionModel): Promise<void> {
    const { mongo } = global.database;
    await mongo.collection("sections").insertOne(sectionModel);
  }
  async find(): Promise<SectionModel[]> {
    const { mongo } = global.database;
    return this.sectionModelMapper.toSectionModels(
      await mongo.collection("sections").find({}).toArray()
    );
  }
  async findOne(ref: string): Promise<SectionModel> {
    const { mongo } = global.database;
    return this.sectionModelMapper.toSectionModel(
      await mongo.collection("sections").findOne({ ref })
    );
  }
  async modifyOne(sectionModel: SectionModel): Promise<void> {
    const { mongo } = global.database;
    await mongo
      .collection("sections")
      .updateOne({ ref: sectionModel.getRef() }, { $set: sectionModel });
  }
  async deleteOne(ref: string): Promise<void> {
    const { mongo } = global.database;
    await mongo.collection("sections").deleteOne({ ref });
  }
}
