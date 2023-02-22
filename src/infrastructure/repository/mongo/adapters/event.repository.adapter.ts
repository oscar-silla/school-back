import { Event } from "../../../../application/domain/event";
import { GeneratedId } from "../../../../application/domain/generated-id";
import { EventRepositoryPort } from "../../../../application/ports/out/event.repository.port";
import { EventsCollection } from "../collections/events.collection";
import { GeneratedIdModelMapper } from "../mappers/generated-id.model.mapper";
import { EventModel } from "../models/EventModel";
import { EventModelMapper } from "../mappers/event.model.mapper";

export class EventRepositoryAdapter implements EventRepositoryPort {
  private eventsCollection = new EventsCollection();
  private eventModelMapper = new EventModelMapper();
  private generatedIdModelMapper = new GeneratedIdModelMapper();

  async save(event: Event): Promise<GeneratedId> {
    const response = await this.eventsCollection.save(event);
    return this.generatedIdModelMapper.toGeneratedId(response);
  }

  async findOne(id: string): Promise<Event> {
    const response: EventModel = await this.eventsCollection.findOne(id);
    return this.eventModelMapper.toEvent(response);
  }

  async find(limit: number, page: number): Promise<Event[]> {
    const response: EventModel[] = await this.eventsCollection.find(
      limit,
      page
    );
    return this.eventModelMapper.toEvents(response);
  }

  async updateOne(id: string, event: Event): Promise<void> {
    await this.eventsCollection.updateOne(id, event);
  }

  async deleteOne(id: string): Promise<void> {
    await this.eventsCollection.deleteOne(id);
  }
}
