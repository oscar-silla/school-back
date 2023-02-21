import { Event } from "../../../../application/domain/event";
import { GeneratedIdModel } from "../models/generated-id.model";

export class EventsCollection {
  async save(event: Event): Promise<GeneratedIdModel> {
    const { mongo } = global.database;
    return await mongo.collection("events").insertOne(event);
  }
}
