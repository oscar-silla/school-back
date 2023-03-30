import { Event } from "../../domain/event";
import { GeneratedId } from "../../domain/generated-id";

export interface EventRepositoryPort {
  save(event: Event): Promise<GeneratedId>;

  findOneById(id: string): Promise<Event>;

  findOneByTitle(title: string): Promise<Event>;

  find(limit: number, page: number): Promise<Event[]>;

  updateOne(event: Event): Promise<void>;

  deleteOne(id: string): Promise<void>;
}
