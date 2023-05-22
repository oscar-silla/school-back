import { SloganModel } from "../models/slogan.model";
import { GeneratedIdModel } from "../models/generated-id.model";
import { GeneratedIdModelMapper } from "../mappers/generated-id.model.mapper";
import { SloganModelMapper } from "../mappers/slogan.model.mapper";
import { SlogansCollectionPort } from "../../../../application/ports/out/collection/slogans.collection.port";

export class SlogansCollection implements SlogansCollectionPort {
  private sloganModelMapper: SloganModelMapper = new SloganModelMapper();
  private generatedIdModelMapper: GeneratedIdModelMapper =
    new GeneratedIdModelMapper();
  async save(sloganDao: SloganModel): Promise<GeneratedIdModel> {
    const { mongo } = global.database;
    return this.generatedIdModelMapper.toGenerateIdModel(
      await mongo.collection("slogans").insertOne(sloganDao)
    );
  }
  async findFirst(): Promise<SloganModel | null> {
    const { mongo } = global.database;
    return this.sloganModelMapper.toSloganModel(
      await mongo.collection("slogans").findOne({})
    );
  }
  async findById(id: string): Promise<SloganModel | null> {
    const { ObjectId, mongo } = global.database;
    return this.sloganModelMapper.toSloganModel(
      await mongo.collection("slogans").findOne({ _id: ObjectId(id) })
    );
  }
  async findByTitle(title: string): Promise<SloganModel | null> {
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
