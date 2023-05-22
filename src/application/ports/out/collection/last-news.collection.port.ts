import { LastNewModel } from "../../../../infrastructure/repository/mongo/models/last-new.model";
import { GeneratedIdModel } from "../../../../infrastructure/repository/mongo/models/generated-id.model";

export interface LastNewsCollectionPort {
  save(lastNewModel: LastNewModel): Promise<GeneratedIdModel>;
  find(limit: number, page: number): Promise<LastNewModel[] | null>;
  findById(id: string): Promise<LastNewModel | null>;
  findByTitle(title: string): Promise<LastNewModel | null>;
  modifyOne(id: string, lastNewModel: LastNewModel): Promise<void>;
  deleteOne(id: string): Promise<void>;
}
