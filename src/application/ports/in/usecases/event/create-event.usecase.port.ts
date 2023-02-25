import { Event } from "../../../../domain/event";
import { GeneratedId } from "../../../../domain/generated-id";

export interface CreateEventUseCasePort {
  createEvent(event: Event): Promise<GeneratedId>;
}
