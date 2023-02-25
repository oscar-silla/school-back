import { Event } from "../../../../domain/event";

export interface GetEventsUseCasePort {
  getEvents(limit: number, page: number): Promise<Event[]>;
}
