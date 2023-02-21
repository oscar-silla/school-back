import { EventRepositoryAdapter } from "../../infrastructure/repository/mongo/adapters/event.repository.adapter";
import { Event } from "../domain/event";
import { GeneratedId } from "../domain/generated-id";
import { EventServicePort } from "../ports/in/services/event.service.port";
import { EventRepositoryPort } from "../ports/out/event.repository.port";

export class EventService implements EventServicePort {
  private eventRepository: EventRepositoryPort = new EventRepositoryAdapter();

  async createEvent(event: Event): Promise<GeneratedId> {
    return await this.eventRepository.save(event);
  }
}
