import { Event } from "../../../../application/domain/event";
import { GeneratedIdDao } from "../models/generated-id.dao";
import { EventDao } from "../models/event.dao";

export class EventsCollection {
  async save(event: Event): Promise<GeneratedIdDao> {
    const { mongo } = global.database;
    return await mongo.collection("events").insertOne(event);
  }

  async findOneById(id: string): Promise<EventDao> {
    const { ObjectId, mongo } = global.database;
    return await mongo.collection("events").findOne({ _id: ObjectId(id) });
  }

  async findOneByTitle(title: string): Promise<EventDao> {
    const { mongo } = global.database;
    return await mongo.collection("events").findOne({ title });
  }

  async find(limit: number, page: number): Promise<EventDao[]> {
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
