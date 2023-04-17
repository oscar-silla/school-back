import { SloganModel } from "../models/slogan.model";
import { GeneratedIdModel } from "../models/generated-id.model";
import { GeneratedIdModelMapper } from "../mappers/generated-id.model.mapper";
import { SloganModelMapper } from "../mappers/slogan.model.mapper";

export class SlogansCollection {
  private sloganModelMapper = new SloganModelMapper();
  private generatedIdModelMapper = new GeneratedIdModelMapper();
  async save(sloganDao: SloganModel): Promise<GeneratedIdModel> {
    const { mongo } = global.database;
    return this.generatedIdModelMapper.toGenerateIdModel(
      await mongo.collection("slogans").insertOne(sloganDao)
    );
  }
  async findFirst(): Promise<SloganModel> {
    const { mongo } = global.database;
    return this.sloganModelMapper.toSloganModel(
      await mongo.collection("slogans").findOne({})
    );
  }
  async findById(id: string): Promise<SloganModel> {
    const { ObjectId, mongo } = global.database;
    return this.sloganModelMapper.toSloganModel(
      await mongo.collection("slogans").findOne({ _id: ObjectId(id) })
    );
  }
  async findByTitle(title: string): Promise<SloganModel> {
    const { mongo } = global.database;
    return this.sloganModelMapper.toSloganModel(
      await mongo.collection("slogans").findOne({ title })
    );
  }
  async modifyOneById(id: string, slogan: SloganModel): Promise<void> {
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
