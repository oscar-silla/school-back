import { Event } from "../../../../domain/event";

export interface UpdateEventUseCasePort {
  updateEvent(id: string, event: Event): Promise<void>;
}