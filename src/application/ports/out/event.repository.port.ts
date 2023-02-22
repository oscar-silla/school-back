import { Event } from "../../domain/event";
import { GeneratedId } from "../../domain/generated-id";

export interface EventRepositoryPort {
  save(event: Event): Promise<GeneratedId>;

  findOne(id: string): Promise<Event>;

  find(limit: number, page: number): Promise<Event[]>;

  updateOne(id: string, event: Event): Promise<void>;

  deleteOne(id: string): Promise<void>;
}
