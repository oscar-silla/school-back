import { EventRepositoryAdapter } from "../../infrastructure/repository/mongo/adapters/event.repository.adapter";
import { Event } from "../domain/event";
import { GeneratedId } from "../domain/generated-id";
import { EventServicePort } from "../ports/in/services/event.service.port";
import { EventRepositoryPort } from "../ports/out/event.repository.port";
import { CustomError } from "../exceptions/CustomError";
import { HttpStatus } from "../domain/http-status";
import { HttpMessage } from "../domain/http-message";

export class EventService implements EventServicePort {
  private eventRepository: EventRepositoryPort = new EventRepositoryAdapter();

  async createEvent(event: Event): Promise<GeneratedId> {
    const existsEvent: Event = await this.eventRepository.findOneByTitle(
      event.getTitle()
    );
    if (existsEvent?.getId()) {
      throw new CustomError(HttpMessage.CONFLICT, HttpStatus.CONFLICT, {});
    }
    return await this.eventRepository.save(event);
  }

  async getEvent(id: string): Promise<Event> {
    const event: Event = await this.eventRepository.findOneById(id);
    if (!event?.getId()) {
      throw new CustomError(HttpMessage.NOT_FOUND, HttpStatus.NOT_FOUND, {});
    }
    return event;
  }

  async getEvents(limit: number, page: number): Promise<Event[]> {
    const events: Event[] = await this.eventRepository.find(limit, page);
    if (!events || events.length === 0) {
      throw new CustomError(HttpMessage.NOT_FOUND, HttpStatus.NOT_FOUND, {});
    }
    return events;
  }

  async updateEvent(id: string, event: Event): Promise<void> {
    const eventToUpdate: Event = await this.getEvent(id);
    const payload: Event = this.buildPayload(event, eventToUpdate, id);
    await this.eventRepository.updateOne(payload);
  }

  async deleteEvent(id: string): Promise<void> {
    await this.getEvent(id);
    await this.eventRepository.deleteOne(id);
  }

  private buildPayload(event: Event, eventToUpdate: Event, id: string): Event {
    const payload: Event = new Event();
    payload.setId(id);
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
    return payload;
  }
}
