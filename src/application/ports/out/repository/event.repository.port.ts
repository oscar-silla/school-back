import { Event } from "../../../domain/event";
import { GeneratedId } from "../../../domain/generated-id";

export interface EventRepositoryPort {
  save(event: Event): Promise<GeneratedId>;
  findOneById(id: string): Promise<Event | null>;
  findOneByTitle(title: string): Promise<Event | null>;
  find(limit: number, page: number): Promise<Event[] | null>;
  updateOne(id: string, event: Event): Promise<void>;
  deleteOne(id: string): Promise<void>;
}
