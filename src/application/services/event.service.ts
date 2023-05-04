import { EventRepositoryAdapter } from "../../infrastructure/repository/mongo/adapters/event.repository.adapter";
import { Event } from "../domain/event";
import { GeneratedId } from "../domain/generated-id";
import { EventServicePort } from "../ports/in/services/event.service.port";
import { EventRepositoryPort } from "../ports/out/repository/event.repository.port";
import { CustomError } from "../exceptions/CustomError";
import { HttpStatus } from "../domain/http-status";
import { HttpMessage } from "../domain/http-message";

export class EventService implements EventServicePort {
  private eventRepository: EventRepositoryPort = new EventRepositoryAdapter();

  async createEvent(event: Event): Promise<GeneratedId> {
    const existsEvent: Event | null = await this.eventRepository.findOneByTitle(
      event.getTitle()
    );
    this.throwConflictExceptionIfEventAlreadyExists(existsEvent);
    return await this.eventRepository.save(event);
  }

  async getEvent(id: string): Promise<Event> {
    const event: Event | null = await this.eventRepository.findOneById(id);
    this.throwExceptionIfNotFoundEvent(event);
    return event!;
  }

  async getEvents(limit: number, page: number): Promise<Event[]> {
    const events: Event[] | null = await this.eventRepository.find(limit, page);
    this.throwExceptionIfNotFoundEvent(events);
    return events!;
  }

  async updateEvent(id: string, event: Event): Promise<void> {
    const eventToUpdate: Event = await this.getEvent(id);
    const payload: Event = this.buildPayload(event, eventToUpdate);
    await this.eventRepository.updateOne(id, payload);
  }

  async deleteEvent(id: string): Promise<void> {
    await this.getEvent(id);
    await this.eventRepository.deleteOne(id);
  }

  private buildPayload(event: Event, eventToUpdate: Event): Event {
    const payload: Event = new Event();
    payload.setTitle(
      event.getTitle() ? event.getTitle() : eventToUpdate.getTitle()
    );
    payload.setDescription(
      event.getDescription()
        ? event.getDescription()
        : eventToUpdate.getDescription()
    );
    payload.setImg(event.getImg() ? event.getImg() : eventToUpdate.getImg());
    payload.setContent(
      event.getContent() ? event.getContent() : eventToUpdate.getContent()
    );
    payload.setColor(
      event.getColor() ? event.getColor() : eventToUpdate.getColor()
    );
    return payload;
  }

  private throwConflictExceptionIfEventAlreadyExists(
    event: Event | null
  ): void {
    if (event) {
      throw new CustomError(HttpMessage.CONFLICT, HttpStatus.CONFLICT, {});
    }
  }

  private throwExceptionIfNotFoundEvent(event: Event | Event[] | null): void {
    if (!event) {
      throw new CustomError(HttpMessage.NOT_FOUND, HttpStatus.NOT_FOUND, {});
    }
  }
}
