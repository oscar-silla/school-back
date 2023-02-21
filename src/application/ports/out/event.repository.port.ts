import { Event } from "../../domain/event";
import { GeneratedId } from "../../domain/generated-id";

export interface EventRepositoryPort {
  save(event: Event): Promise<GeneratedId>;
}
