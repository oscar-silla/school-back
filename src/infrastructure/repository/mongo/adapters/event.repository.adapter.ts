import { Event } from "../../../../application/domain/event";
import { GeneratedId } from "../../../../application/domain/generated-id";
import { EventRepositoryPort } from "../../../../application/ports/out/event.repository.port";
import { EventsCollection } from "../collections/events.collection";
import { GeneratedIdModelMapper } from "../mappers/generated-id.model.mapper";

export class EventRepositoryAdapter implements EventRepositoryPort {
  private eventsCollection = new EventsCollection();

  private generatedIdModelMapper = new GeneratedIdModelMapper();

  async save(event: Event): Promise<GeneratedId> {
    const response = await this.eventsCollection.save(event);
    return this.generatedIdModelMapper.toGeneratedId(response);
  }
}
