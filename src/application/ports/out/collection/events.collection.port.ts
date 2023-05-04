import { EventModel } from "../../../../infrastructure/repository/mongo/models/event.model";
import { GeneratedIdModel } from "../../../../infrastructure/repository/mongo/models/generated-id.model";

export interface EventsCollectionPort {
  save(eventModel: EventModel): Promise<GeneratedIdModel>;
  findOneById(id: string): Promise<EventModel | null>;
  findOneByTitle(title: string): Promise<EventModel | null>;
  find(limit: number, page: number): Promise<EventModel[] | null>;
  updateOne(id: string, eventModel: EventModel): Promise<void>;
  deleteOne(id: string): Promise<void>;
}
