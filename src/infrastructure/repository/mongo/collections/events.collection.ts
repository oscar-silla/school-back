import { Event } from "../../../../application/domain/event";
import { GeneratedIdModel } from "../models/generated-id.model";
import { EventModel } from "../models/EventModel";

export class EventsCollection {
  async save(event: Event): Promise<GeneratedIdModel> {
    const { mongo } = global.database;
    return await mongo.collection("events").insertOne(event);
  }

  async findOne(id: string): Promise<EventModel> {
    const { ObjectId, mongo } = global.database;
    return await mongo.collection("events").findOne({ _id: ObjectId(id) });
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
}
