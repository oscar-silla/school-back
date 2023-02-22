import { EventRepositoryAdapter } from "../../infrastructure/repository/mongo/adapters/event.repository.adapter";
import { Event } from "../domain/event";
import { GeneratedId } from "../domain/generated-id";
import { EventServicePort } from "../ports/in/services/event.service.port";
import { EventRepositoryPort } from "../ports/out/event.repository.port";
import { CustomError } from "../exceptions/CustomError";
import { HttpCode } from "../domain/http-code";
import { HttpMessage } from "../domain/http-message";

export class EventService implements EventServicePort {
  private eventRepository: EventRepositoryPort = new EventRepositoryAdapter();

  async createEvent(event: Event): Promise<GeneratedId> {
    return await this.eventRepository.save(event); // Todo: Validate if event already exists
  }

  async getEvent(id: string): Promise<Event> {
    const event: Event = await this.eventRepository.findOne(id);
    if (!event) {
      throw new CustomError(HttpMessage.NOT_FOUND, HttpCode.NOT_FOUND, {});
    }
    return event;
  }

  async getEvents(limit: number, page: number): Promise<Event[]> {
    const events: Event[] = await this.eventRepository.find(limit, page);
    if (!events || events.length === 0) {
      throw new CustomError(HttpMessage.NOT_FOUND, HttpCode.NOT_FOUND, {});
    }
    return events;
  }

  async updateEvent(id: string, event: Event): Promise<void> {
    const eventToUpdate: Event = await this.getEvent(id);
    const payload: Event = this.buildPayload(event, eventToUpdate);
    await this.eventRepository.updateOne(id, payload);
  }

  private buildPayload(event: Event, eventToUpdate: Event): Event {
    return new Event(
      event.getTitle() ? event.getTitle() : eventToUpdate.getTitle(),
      event.getDescription()
        ? event.getDescription()
        : eventToUpdate.getDescription(),
      event.getImg() ? event.getImg() : eventToUpdate.getImg(),
      event.getContent() ? event.getContent() : eventToUpdate.getContent()
    );
  }
}
