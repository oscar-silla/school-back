import { Event } from "../../../../application/domain/event";
import { EventModel } from "../models/event.model";
import { GeneratedId } from "../../../../application/domain/generated-id";
import { EventRepositoryPort } from "../../../../application/ports/out/repository/event.repository.port";
import { EventsCollection } from "../collections/events.collection";

import { GeneratedIdModelMapper } from "../mappers/generated-id.model.mapper";
import { EventModelModelMapper } from "../mappers/event.model.model.mapper";
import { GeneratedIdModel } from "../models/generated-id.model";
import { EventsCollectionPort } from "../../../../application/ports/out/collection/events.collection.port";

export class EventRepositoryAdapter implements EventRepositoryPort {
  private eventsCollection: EventsCollectionPort = new EventsCollection();
  private eventModelMapper: EventModelModelMapper = new EventModelModelMapper();
  private generatedIdModelMapper: GeneratedIdModelMapper =
    new GeneratedIdModelMapper();

  async save(event: Event): Promise<GeneratedId> {
    const eventModel: EventModel = this.eventModelMapper.toEventModel(event)!;
    const response: GeneratedIdModel = await this.eventsCollection.save(
      eventModel
    );
    return this.generatedIdModelMapper.toGeneratedId(response);
  }

  async findOneById(id: string): Promise<Event | null> {
    const response: EventModel | null = await this.eventsCollection.findOneById(
      id
    );
    return this.eventModelMapper.toEvent(response);
  }

  async findOneByTitle(title: string): Promise<Event | null> {
    const response: EventModel | null =
      await this.eventsCollection.findOneByTitle(title);
    return this.eventModelMapper.toEvent(response);
  }

  async find(limit: number, page: number): Promise<Event[] | null> {
    const response: EventModel[] | null = await this.eventsCollection.find(
      limit,
      page
    );
    return this.eventModelMapper.toEvents(response);
  }

  async updateOne(id: string, event: Event): Promise<void> {
    const eventModel: EventModel = this.eventModelMapper.toEventModel(event)!;
    await this.eventsCollection.updateOne(id, eventModel);
  }

  async deleteOne(id: string): Promise<void> {
    await this.eventsCollection.deleteOne(id);
  }
}
