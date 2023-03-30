import { Event } from "../../../../application/domain/event";
import { GeneratedIdModel } from "../models/generated-id.model";
import { EventModel } from "../models/event.model";
import { GeneratedIdModelMapper } from "../mappers/generated-id.model.mapper";

export class EventsCollection {
  private generateIdModelMapper: GeneratedIdModelMapper =
    new GeneratedIdModelMapper();
  async save(eventModel: EventModel): Promise<GeneratedIdModel> {
    const { mongo } = global.database;
    return this.generateIdModelMapper.toGenerateIdModel(
      await mongo.collection("events").insertOne(eventModel)
    );
  }

  async findOneById(id: string): Promise<EventModel> {
    const { ObjectId, mongo } = global.database;
    return await mongo.collection("events").findOne({ _id: ObjectId(id) });
  }

  async findOneByTitle(title: string): Promise<EventModel> {
    const { mongo } = global.database;
    return await mongo.collection("events").findOne({ title });
  }

  async find(limit: number, page: number): Promise<EventModel[]> {
    const { mongo } = global.database;
    return await mongo
      .collection("events")
      .find({})
      .limit(limit)
      .skip(limit * page)
      .toArray();
  }

  async updateOne(id: string, event: Event): Promise<void> {
    const { ObjectId, mongo } = global.database;
    await mongo
      .collection("events")
      .updateOne({ _id: ObjectId(id) }, { $set: event });
  }

  async deleteOne(id: string): Promise<void> {
    const { ObjectId, mongo } = global.database;
    await mongo.collection("events").deleteOne({ _id: ObjectId(id) });
  }
}
