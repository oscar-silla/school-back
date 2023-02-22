import { Event } from "../../../domain/event";
import { GeneratedId } from "../../../domain/generated-id";

export interface EventServicePort {
  createEvent(event: Event): Promise<GeneratedId>;

  getEvent(id: string): Promise<Event>;

  getEvents(limit: number, page: number): Promise<Event[]>;
}
