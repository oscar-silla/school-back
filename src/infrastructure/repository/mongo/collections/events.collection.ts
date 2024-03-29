import { EventModel } from "../models/event.model";
import { GeneratedIdModel } from "../models/generated-id.model";
import { EventModelModelMapper } from "../mappers/event.model.model.mapper";
import { GeneratedIdModelMapper } from "../mappers/generated-id.model.mapper";
import { EventsCollectionPort } from "../../../../application/ports/out/collection/events.collection.port";

export class EventsCollection implements EventsCollectionPort {
  private eventModelMapper: EventModelModelMapper = new EventModelModelMapper();
  private generateIdModelMapper: GeneratedIdModelMapper =
    new GeneratedIdModelMapper();
  async save(eventModel: EventModel): Promise<GeneratedIdModel> {
    const { mongo } = global.database;
    return this.generateIdModelMapper.toGenerateIdModel(
      await mongo.collection("events").insertOne(eventModel)
    );
  }

  async findOneById(id: string): Promise<EventModel | null> {
    const { ObjectId, mongo } = global.database;
    return this.eventModelMapper.toEventModel(
      await mongo.collection("events").findOne({ _id: ObjectId(id) })
    );
  }

  async findOneByTitle(title: string): Promise<EventModel | null> {
    const { mongo } = global.database;
    return this.eventModelMapper.toEventModel(
      await mongo.collection("events").findOne({ title })
    );
  }

  async find(limit: number, page: number): Promise<EventModel[] | null> {
    const { mongo } = global.database;
    return this.eventModelMapper.toEventModels(
      await mongo
        .collection("events")
        .find({})
        .limit(limit)
        .skip(limit * page)
        .toArray()
    );
  }

  async updateOne(id: string, eventModel: EventModel): Promise<void> {
    const { ObjectId, mongo } = global.database;
    await mongo
      .collection("events")
      .updateOne({ _id: ObjectId(id) }, { $set: eventModel });
  }

  async deleteOne(id: string): Promise<void> {
    const { ObjectId, mongo } = global.database;
    await mongo.collection("events").deleteOne({ _id: ObjectId(id) });
  }
}
