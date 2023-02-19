import { Event } from "../../../domain/event";
import { GeneratedId } from "../../../domain/generated-id";

export interface EventServicePort {
  createEvent(event: Event): Promise<GeneratedId>;
}
